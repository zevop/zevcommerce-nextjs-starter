'use client';

import { useState } from 'react';
import type { Product } from '@zevcommerce/storefront';
import { PriceDisplay } from '@/components/product/PriceDisplay';
import { VariantSelector } from '@/components/product/VariantSelector';
import { AddToCartButton } from '@/components/product/AddToCartButton';

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '');
    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

    return (
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {/* Title & Price */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                    {product.title}
                </h1>
                <div className="mt-3">
                    <PriceDisplay
                        price={selectedVariant?.price ?? 0}
                        compareAtPrice={selectedVariant?.compareAtPrice}
                        size="lg"
                    />
                </div>
            </div>

            {/* Description */}
            {product.description && (
                <p className="text-sm text-text-secondary leading-relaxed">
                    {product.description}
                </p>
            )}

            {/* Variant Selector */}
            <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelect={setSelectedVariantId}
            />

            {/* SKU */}
            {selectedVariant?.sku && (
                <p className="text-xs text-text-secondary">
                    SKU: {selectedVariant.sku}
                </p>
            )}

            {/* Add to Cart */}
            <AddToCartButton
                variantId={selectedVariantId}
                productTitle={product.title}
            />
        </div>
    );
}
