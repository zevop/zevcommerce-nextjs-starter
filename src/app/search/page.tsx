import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import { search } from '@/lib/api/search';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ROUTES } from '@/lib/constants';
import { getProductBySlug } from '@/lib/api/products';
import { isDemoMode } from '@/lib/demo-mode';
import { mockProducts } from '@/data/mock/products';
import type { Product } from '@zevcommerce/storefront';

export const metadata: Metadata = {
    title: 'Search',
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q?.trim() || '';

    if (!query) {
        return (
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ maxWidth: '1440px' }}>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-8">Search</h1>
                <div className="max-w-xl mx-auto">
                    <form action={ROUTES.SEARCH} method="GET" className="relative">
                        <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="search"
                            name="q"
                            placeholder="Search products, collections, articles..."
                            autoFocus
                            className="w-full h-12 pl-12 pr-4 rounded-lg border border-border-light bg-surface text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                    </form>
                </div>
            </div>
        );
    }

    const results = await search(query, 20);

    // Resolve full product objects for product results
    let productResults: Product[] = [];
    if (results.products.length > 0) {
        if (isDemoMode()) {
            productResults = mockProducts.filter(p =>
                results.products.some(r => r.id === p.id)
            );
        } else {
            const resolved = await Promise.all(
                results.products.slice(0, 12).map(r => getProductBySlug(r.slug))
            );
            productResults = resolved.filter((p): p is Product => p !== null);
        }
    }

    const totalResults =
        results.products.length +
        results.collections.length +
        results.pages.length +
        results.articles.length;

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ maxWidth: '1440px' }}>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                    Search results
                </h1>
                <p className="mt-2 text-sm text-text-secondary">
                    {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                </p>
            </div>

            {/* Search form */}
            <form action={ROUTES.SEARCH} method="GET" className="relative max-w-xl mb-10">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Search..."
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-border-light bg-surface text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
            </form>

            {totalResults === 0 ? (
                <EmptyState
                    icon={<SearchIcon size={48} strokeWidth={1.5} />}
                    title={`No results for "${query}"`}
                    description="Try searching with different keywords or browse our collections."
                    actionLabel="Browse Products"
                    actionHref={ROUTES.PRODUCTS}
                />
            ) : (
                <div className="space-y-12">
                    {/* Products */}
                    {productResults.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Products ({results.products.length})
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
                                {productResults.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Collections */}
                    {results.collections.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Collections ({results.collections.length})
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.collections.map(c => (
                                    <Link
                                        key={c.id}
                                        href={ROUTES.COLLECTION(c.slug)}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border-light hover:border-brand/20 hover:bg-surface-hover transition-colors"
                                    >
                                        <div>
                                            <h3 className="text-sm font-medium text-text-primary">{c.title}</h3>
                                            <p className="text-xs text-text-secondary">{c.productCount} products</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Pages */}
                    {results.pages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Pages ({results.pages.length})
                            </h2>
                            <div className="space-y-2">
                                {results.pages.map(p => (
                                    <Link
                                        key={p.id}
                                        href={ROUTES.PAGE(p.slug)}
                                        className="block p-3 rounded-lg border border-border-light hover:border-brand/20 hover:bg-surface-hover transition-colors"
                                    >
                                        <h3 className="text-sm font-medium text-text-primary">{p.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Articles */}
                    {results.articles.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Articles ({results.articles.length})
                            </h2>
                            <div className="space-y-2">
                                {results.articles.map(a => (
                                    <Link
                                        key={a.id}
                                        href={ROUTES.BLOG_ARTICLE(a.slug)}
                                        className="block p-3 rounded-lg border border-border-light hover:border-brand/20 hover:bg-surface-hover transition-colors"
                                    >
                                        <h3 className="text-sm font-medium text-text-primary">{a.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
