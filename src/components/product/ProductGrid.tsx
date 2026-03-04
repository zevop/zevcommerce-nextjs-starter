import type { Product } from '@zevcommerce/storefront';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ShoppingBag } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface ProductGridProps {
    products: Product[];
    emptyTitle?: string;
    emptyDescription?: string;
}

export function ProductGrid({ products, emptyTitle, emptyDescription }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <EmptyState
                icon={<ShoppingBag size={48} strokeWidth={1.5} />}
                title={emptyTitle || 'No products found'}
                description={emptyDescription || 'Check back soon for new arrivals.'}
                actionLabel="Browse All Products"
                actionHref={ROUTES.PRODUCTS}
            />
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
