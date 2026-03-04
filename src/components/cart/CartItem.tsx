'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import type { CartLine } from '@zevcommerce/storefront';

interface CartItemProps {
    line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
    const { updateItem, removeItem } = useCart();

    return (
        <div className="flex gap-4">
            {/* Placeholder image */}
            <div className="w-20 h-24 rounded-md bg-surface-hover shrink-0" />

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary truncate">{line.productTitle}</h4>
                {line.variantTitle && (
                    <p className="text-xs text-text-secondary mt-0.5">{line.variantTitle}</p>
                )}
                <p className="text-sm font-semibold text-brand mt-1">{formatPrice(line.unitPrice)}</p>

                {/* Quantity controls */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border-light rounded-md">
                        <button
                            onClick={() => {
                                if (line.quantity <= 1) {
                                    removeItem(line.variantId);
                                } else {
                                    updateItem(line.variantId, line.quantity - 1);
                                }
                            }}
                            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
                        <button
                            onClick={() => updateItem(line.variantId, line.quantity + 1)}
                            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(line.variantId)}
                        className="p-1.5 text-text-secondary hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
