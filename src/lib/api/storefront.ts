import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockStorefrontConfig, mockPaymentMethods, mockShippingZones, mockMenu } from '@/data/mock/storefront';
import type { StorefrontConfig, PaymentMethod, ShippingZone, ShippingRate, Menu } from '@zevcommerce/storefront';

export async function getStorefrontConfig(): Promise<StorefrontConfig> {
    if (isDemoMode()) return mockStorefrontConfig;
    return zevClient.storefront.getConfig();
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
    if (isDemoMode()) return mockPaymentMethods;
    return zevClient.storefront.getPaymentMethods();
}

export async function getShippingZones(): Promise<ShippingZone[]> {
    if (isDemoMode()) return mockShippingZones;
    return zevClient.storefront.getShippingZones();
}

export async function getShippingRates(country: string, state: string, city: string, total: number): Promise<ShippingRate[]> {
    if (isDemoMode()) {
        // Return rates from the matching mock zone
        const zone = mockShippingZones.find(z => {
            const locations = JSON.parse(z.locationsJson as string);
            return locations.some((loc: { country: string; state?: string }) =>
                loc.country === country && (!loc.state || loc.state === state)
            );
        }) || mockShippingZones.find(z => z.isDefault);
        return zone?.rates || [];
    }
    return zevClient.storefront.getShippingRates(country, state, city, total);
}

export async function getCities(countryCode: string, stateCode: string): Promise<string[]> {
    if (isDemoMode()) {
        return ['Lagos', 'Ikeja', 'Lekki', 'Victoria Island', 'Surulere', 'Yaba'];
    }
    return zevClient.storefront.getCities(countryCode, stateCode);
}

export async function getMenu(handle?: string): Promise<Menu> {
    if (isDemoMode()) return mockMenu;
    return zevClient.storefront.getMenu(handle);
}
