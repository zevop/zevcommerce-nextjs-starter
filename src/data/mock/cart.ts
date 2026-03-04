import type { Cart } from '@zevcommerce/storefront';

/** Empty cart for initial demo state */
export const mockEmptyCart: Cart = {
    id: 'cart_demo',
    accessToken: 'demo_cart_token',
    currency: 'NGN',
    status: 'active',
    totalItems: 0,
    subtotal: 0,
    lines: [],
};

/** Sample cart with items for demo previewing */
export const mockCartWithItems: Cart = {
    id: 'cart_demo',
    accessToken: 'demo_cart_token',
    currency: 'NGN',
    status: 'active',
    totalItems: 3,
    subtotal: 15900,
    lines: [
        {
            variantId: 'var_001b',
            productTitle: 'Essential Cotton Tee',
            variantTitle: 'Medium / White',
            quantity: 2,
            unitPrice: 3500,
            lineTotal: 7000,
            availableQuantity: 50,
        },
        {
            variantId: 'var_002a',
            productTitle: 'Heavyweight Hoodie',
            variantTitle: 'Medium / Grey',
            quantity: 1,
            unitPrice: 8900,
            lineTotal: 8900,
            availableQuantity: 25,
        },
    ],
};
