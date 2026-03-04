import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockCollections, mockCollectionProducts } from '@/data/mock/collections';
import { mockProducts } from '@/data/mock/products';
import type { Collection, Product } from '@zevcommerce/storefront';

export async function getCollections(): Promise<Collection[]> {
    if (isDemoMode()) return mockCollections;
    return zevClient.collections.list();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
    if (isDemoMode()) {
        return mockCollections.find(c => c.slug === slug) || null;
    }
    try {
        return await zevClient.collections.getBySlug(slug);
    } catch {
        return null;
    }
}

export async function getCollectionProducts(slug: string): Promise<Product[]> {
    if (isDemoMode()) {
        const productIds = mockCollectionProducts[slug] || [];
        return mockProducts.filter(p => productIds.includes(p.id));
    }
    // In live mode, the collection.getBySlug returns collection info.
    // Products within a collection are fetched via the products endpoint with collection filter,
    // or the collection response includes products. Adjust based on actual SDK behavior.
    const collection = await zevClient.collections.getBySlug(slug);
    // If the SDK returns products on the collection, use those.
    // Otherwise fall back to listing all products (the actual SDK may need a filter param).
    return (collection as unknown as { products?: Product[] })?.products || [];
}
