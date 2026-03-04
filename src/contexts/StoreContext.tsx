'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { StorefrontConfig } from '@zevcommerce/storefront';

interface StoreContextValue {
    config: StorefrontConfig;
    currency: string;
    storeName: string;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ config, children }: { config: StorefrontConfig; children: ReactNode }) {
    const currency = config.currency || 'NGN';
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME || config.name || 'Store';

    return (
        <StoreContext.Provider value={{ config, currency, storeName }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error('useStore must be used within StoreProvider');
    return ctx;
}
