'use client';

import type { ProductVariant } from '@zevcommerce/storefront';
import { cn } from '@/lib/utils';

interface VariantSelectorProps {
    variants: ProductVariant[];
    selectedVariantId: string;
    onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
    if (variants.length <= 1) return null;

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
                Variant
            </label>
            <div className="flex flex-wrap gap-2">
                {variants.map(variant => (
                    <button
                        key={variant.id}
                        onClick={() => onSelect(variant.id)}
                        className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-colors',
                            variant.id === selectedVariantId
                                ? 'border-brand bg-brand text-white'
                                : 'border-border-light bg-surface text-text-primary hover:border-brand/50'
                        )}
                    >
                        {variant.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
