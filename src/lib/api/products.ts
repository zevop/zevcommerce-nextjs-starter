import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockProducts, mockProductsMeta } from '@/data/mock/products';
import type { Product, PaginationMeta } from '@zevcommerce/storefront';

export async function getProducts(params?: { page?: number; limit?: number }): Promise<{ data: Product[]; meta: PaginationMeta }> {
    if (isDemoMode()) {
        const page = params?.page || 1;
        const limit = params?.limit || 12;
        const start = (page - 1) * limit;
        const sliced = mockProducts.slice(start, start + limit);
        return {
            data: sliced,
            meta: { total: mockProducts.length, page, limit, totalPages: Math.ceil(mockProducts.length / limit) },
        };
    }
    return zevClient.products.list(params);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    if (isDemoMode()) {
        return mockProducts.find(p => p.slug === slug) || null;
    }
    try {
        return await zevClient.products.getBySlug(slug);
    } catch {
        return null;
    }
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    if (isDemoMode()) {
        return mockProducts.slice(0, limit);
    }
    const result = await zevClient.products.list({ limit });
    return result.data;
}
