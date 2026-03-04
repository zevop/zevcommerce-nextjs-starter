import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockEmptyCart, mockCartWithItems } from '@/data/mock/cart';
import type { Cart, CartItemInput, CartLine } from '@zevcommerce/storefront';
import { STORAGE_KEYS } from '@/lib/constants';

// Helper to simulate a network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DEMO_CART_ID = 'cart_demo_active';

function getLocalDemoCart(): Cart {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('demo_cart_state');
        if (stored) return JSON.parse(stored);
    }
    return { ...mockEmptyCart, id: DEMO_CART_ID, accessToken: 'demo_token' };
}

function saveLocalDemoCart(cart: Cart) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('demo_cart_state', JSON.stringify(cart));
    }
}

export async function createCart(): Promise<Cart> {
    if (isDemoMode()) {
        await delay(500);
        const cart = getLocalDemoCart();
        saveLocalDemoCart(cart);
        return cart;
    }
    return zevClient.cart.create();
}

export async function getCart(cartId: string, cartAccessToken: string): Promise<Cart> {
    if (isDemoMode()) {
        await delay(300);
        return getLocalDemoCart();
    }
    return zevClient.cart.get(cartId, cartAccessToken);
}

export async function addCartLines(cartId: string, cartAccessToken: string, lines: CartItemInput[]): Promise<Cart> {
    if (isDemoMode()) {
        await delay(600);
        const cart = getLocalDemoCart();

        let newLines = [...cart.lines];

        lines.forEach(input => {
            const existingIdx = newLines.findIndex(l => l.variantId === input.variantId);
            if (existingIdx >= 0) {
                newLines[existingIdx].quantity += input.quantity;
                newLines[existingIdx].lineTotal = newLines[existingIdx].quantity * newLines[existingIdx].unitPrice;
            } else {
                // Mock adding a new line based on the second item in our mock data since we don't have a full catalog lookup here
                const mockSource = mockCartWithItems.lines.find(l => l.variantId === input.variantId)
                    || { ...mockCartWithItems.lines[0], variantId: input.variantId };

                newLines.push({
                    ...mockSource,
                    quantity: input.quantity,
                    lineTotal: mockSource.unitPrice * input.quantity
                });
            }
        });

        cart.lines = newLines;
        cart.totalItems = newLines.reduce((acc, l) => acc + l.quantity, 0);
        cart.subtotal = newLines.reduce((acc, l) => acc + l.lineTotal, 0);

        saveLocalDemoCart(cart);
        return cart;
    }
    return zevClient.cart.addLines(cartId, cartAccessToken, lines);
}

export async function updateCartLines(cartId: string, cartAccessToken: string, lines: CartItemInput[]): Promise<Cart> {
    if (isDemoMode()) {
        await delay(600);
        const cart = getLocalDemoCart();

        let newLines = [...cart.lines];

        lines.forEach(input => {
            const existingIdx = newLines.findIndex(l => l.variantId === input.variantId);
            if (existingIdx >= 0) {
                if (input.quantity <= 0) {
                    newLines.splice(existingIdx, 1);
                } else {
                    newLines[existingIdx].quantity = input.quantity;
                    newLines[existingIdx].lineTotal = newLines[existingIdx].quantity * newLines[existingIdx].unitPrice;
                }
            }
        });

        cart.lines = newLines;
        cart.totalItems = newLines.reduce((acc, l) => acc + l.quantity, 0);
        cart.subtotal = newLines.reduce((acc, l) => acc + l.lineTotal, 0);

        saveLocalDemoCart(cart);
        return cart;
    }
    return zevClient.cart.updateLines(cartId, cartAccessToken, lines);
}
