import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Collection } from '@zevcommerce/storefront';
import { CollectionCard } from '@/components/collection/CollectionCard';
import { ROUTES } from '@/lib/constants';

interface FeaturedCollectionsProps {
    collections: Collection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
    if (collections.length === 0) return null;

    return (
        <section className="bg-surface-muted">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" style={{ maxWidth: '1440px' }}>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                            Shop by Collection
                        </h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            Curated edits for every style and occasion
                        </p>
                    </div>
                    <Link
                        href={ROUTES.COLLECTIONS}
                        className="hidden sm:flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                        All Collections
                        <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {collections.slice(0, 3).map(collection => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </div>
        </section>
    );
}
