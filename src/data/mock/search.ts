import type { SearchResults } from '@zevcommerce/storefront';
import { mockProducts } from './products';
import { mockCollections } from './collections';
import { mockPages } from './content';
import { mockArticles } from './content';

/**
 * Simple client-side search across mock data.
 * Matches title/slug against the search term (case-insensitive).
 */
export function mockSearch(term: string, limit: number = 10): SearchResults {
    const t = term.toLowerCase();

    return {
        products: mockProducts
            .filter(p => p.title.toLowerCase().includes(t) || p.slug.toLowerCase().includes(t))
            .slice(0, limit)
            .map(p => ({ id: p.id, title: p.title, slug: p.slug })),
        collections: mockCollections
            .filter(c => c.title.toLowerCase().includes(t) || c.slug.toLowerCase().includes(t))
            .slice(0, limit)
            .map(c => ({ id: c.id, title: c.title, slug: c.slug, productCount: c.productCount })),
        pages: mockPages
            .filter(p => p.title.toLowerCase().includes(t) || p.slug.toLowerCase().includes(t))
            .slice(0, limit)
            .map(p => ({ id: p.id, title: p.title, slug: p.slug })),
        articles: mockArticles
            .filter(a => a.title.toLowerCase().includes(t) || a.slug.toLowerCase().includes(t))
            .slice(0, limit)
            .map(a => ({ id: a.id, title: a.title, slug: a.slug })),
    };
}
