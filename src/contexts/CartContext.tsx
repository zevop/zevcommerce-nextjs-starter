'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';
import { createCart, getCart, addCartLines, updateCartLines } from '@/lib/api/cart';
import type { Cart, CartLine } from '@zevcommerce/storefront';

interface CartContextValue {
    cart: Cart | null;
    isLoading: boolean;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addItem: (variantId: string, quantity?: number) => Promise<void>;
    updateItem: (variantId: string, quantity: number) => Promise<void>;
    removeItem: (variantId: string) => Promise<void>;
    itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Restore cart from localStorage on mount
    useEffect(() => {
        const cartId = localStorage.getItem(STORAGE_KEYS.CART_ID);
        const cartToken = localStorage.getItem(STORAGE_KEYS.CART_TOKEN);
        if (cartId && cartToken) {
            getCart(cartId, cartToken)
                .then(setCart)
                .catch(() => {
                    // Cart expired or invalid, clear stored references
                    localStorage.removeItem(STORAGE_KEYS.CART_ID);
                    localStorage.removeItem(STORAGE_KEYS.CART_TOKEN);
                });
        }
    }, []);

    const persistCart = useCallback((c: Cart) => {
        setCart(c);
        localStorage.setItem(STORAGE_KEYS.CART_ID, c.id);
        localStorage.setItem(STORAGE_KEYS.CART_TOKEN, c.accessToken);
    }, []);

    const ensureCart = useCallback(async (): Promise<Cart> => {
        if (cart) return cart;
        const newCart = await createCart();
        persistCart(newCart);
        return newCart;
    }, [cart, persistCart]);

    const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
        setIsLoading(true);
        try {
            const c = await ensureCart();
            const updated = await addCartLines(c.id, c.accessToken, [{ variantId, quantity }]);
            persistCart(updated);
            setIsCartOpen(true);
        } finally {
            setIsLoading(false);
        }
    }, [ensureCart, persistCart]);

    const updateItem = useCallback(async (variantId: string, quantity: number) => {
        if (!cart) return;
        setIsLoading(true);
        try {
            const updated = await updateCartLines(cart.id, cart.accessToken, [{ variantId, quantity }]);
            persistCart(updated);
        } finally {
            setIsLoading(false);
        }
    }, [cart, persistCart]);

    const removeItem = useCallback(async (variantId: string) => {
        if (!cart) return;
        setIsLoading(true);
        try {
            // Remove by setting quantity to 0
            const updated = await updateCartLines(cart.id, cart.accessToken, [{ variantId, quantity: 0 }]);
            persistCart(updated);
        } finally {
            setIsLoading(false);
        }
    }, [cart, persistCart]);

    const itemCount = cart?.totalItems || 0;

    return (
        <CartContext.Provider value={{
            cart,
            isLoading,
            isCartOpen,
            openCart: () => setIsCartOpen(true),
            closeCart: () => setIsCartOpen(false),
            toggleCart: () => setIsCartOpen(prev => !prev),
            addItem,
            updateItem,
            removeItem,
            itemCount,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
