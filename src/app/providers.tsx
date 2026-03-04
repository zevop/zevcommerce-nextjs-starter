'use client';

import type { ReactNode } from 'react';
import type { StorefrontConfig } from '@zevcommerce/storefront';
import { StoreProvider } from '@/contexts/StoreContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

export function Providers({ config, children }: { config: StorefrontConfig; children: ReactNode }) {
    return (
        <ToastProvider>
            <StoreProvider config={config}>
                <AuthProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AuthProvider>
            </StoreProvider>
        </ToastProvider>
    );
}
