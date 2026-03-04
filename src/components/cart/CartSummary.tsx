import { formatPrice } from '@/lib/utils';
import type { Cart } from '@zevcommerce/storefront';

interface CartSummaryProps {
    cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text-primary">{formatPrice(cart.subtotal, cart.currency)}</span>
            </div>
            <p className="text-xs text-text-secondary">Shipping and taxes calculated at checkout</p>
        </div>
    );
}
