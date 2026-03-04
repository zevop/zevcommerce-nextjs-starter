import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Collection } from '@zevcommerce/storefront';
import { ROUTES } from '@/lib/constants';

interface CollectionCardProps {
    collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link href={ROUTES.COLLECTION(collection.slug)} className="group block">
            <div className="relative flex aspect-[3/2] w-full items-end overflow-hidden rounded-lg bg-surface-hover border border-border-light transition-all duration-300 group-hover:border-brand/20 group-hover:shadow-lg p-6">
                <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors">
                        {collection.title}
                    </h3>
                    {collection.description && (
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2 max-w-sm">
                            {collection.description}
                        </p>
                    )}
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-text-secondary group-hover:text-brand transition-colors">
                        <span>{collection.productCount} products</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
        </Link>
    );
}
