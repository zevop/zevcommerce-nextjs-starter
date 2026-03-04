import type { Collection } from '@zevcommerce/storefront';
import { CollectionCard } from './CollectionCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Layers } from 'lucide-react';

interface CollectionGridProps {
    collections: Collection[];
}

export function CollectionGrid({ collections }: CollectionGridProps) {
    if (collections.length === 0) {
        return (
            <EmptyState
                icon={<Layers size={48} strokeWidth={1.5} />}
                title="No collections yet"
                description="Collections will appear here once they are created in the dashboard."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {collections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
}
