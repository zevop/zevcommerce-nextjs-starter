import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@zevcommerce/storefront';
import { ProductCard } from '@/components/product/ProductCard';
import { ROUTES } from '@/lib/constants';

interface FeaturedProductsProps {
    products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" style={{ maxWidth: '1440px' }}>
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                        New Arrivals
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                        The latest additions to our collection
                    </p>
                </div>
                <Link
                    href={ROUTES.PRODUCTS}
                    className="hidden sm:flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                    View All
                    <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6">
                {products.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
                <Link
                    href={ROUTES.PRODUCTS}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                    View All Products
                    <ArrowRight size={14} />
                </Link>
            </div>
        </section>
    );
}
