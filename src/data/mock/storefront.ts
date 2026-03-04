import type { StorefrontConfig, PaymentMethod, ShippingZone, Menu } from '@zevcommerce/storefront';

export const mockStorefrontConfig: StorefrontConfig = {
    id: 'store_001',
    name: 'ATELIER',
    handle: 'atelier',
    currency: 'NGN',
    seoTitle: 'ATELIER — Modern Fashion & Lifestyle',
    seoDescription: 'Discover curated essentials for the modern wardrobe. Premium quality, thoughtful design, effortless style.',
    storeLogo: null,
    passwordEnabled: false,
    accountConfigJson: null,
    socialLinksJson: JSON.stringify([
        { platform: 'instagram', url: 'https://instagram.com/atelier' },
        { platform: 'twitter', url: 'https://twitter.com/atelier' },
    ]),
};

export const mockPaymentMethods: PaymentMethod[] = [
    {
        provider: 'bank_transfer',
        publicKey: null,
        paymentMethodsJson: null,
        additionalDetails: 'Access Bank\nAccount Number: 0123456789\nAccount Name: Atelier Fashion Ltd',
        paymentInstructions: 'Transfer the exact order total to the bank account above. Use your order number as the payment reference. Your order will be confirmed once we verify the payment.',
    },
    {
        provider: 'zevpay',
        publicKey: 'zpk_demo_1234567890',
        paymentMethodsJson: null,
        additionalDetails: null,
        paymentInstructions: 'You will be redirected to ZevPay to complete your payment securely.',
    },
    {
        provider: 'cash',
        publicKey: null,
        paymentMethodsJson: null,
        additionalDetails: null,
        paymentInstructions: 'Pay with cash on delivery. Please have the exact amount ready.',
    },
];

export const mockShippingZones: ShippingZone[] = [
    {
        id: 'zone_001',
        name: 'Lagos',
        isDefault: true,
        locationsJson: JSON.stringify([{ country: 'NG', state: 'Lagos' }]),
        rates: [
            { id: 'rate_001', name: 'Standard Delivery', price: 2500, estimatedDays: 3 },
            { id: 'rate_002', name: 'Express Delivery', price: 5000, estimatedDays: 1 },
        ],
    },
    {
        id: 'zone_002',
        name: 'Rest of Nigeria',
        isDefault: false,
        locationsJson: JSON.stringify([{ country: 'NG' }]),
        rates: [
            { id: 'rate_003', name: 'Standard Delivery', price: 4000, estimatedDays: 5 },
            { id: 'rate_004', name: 'Express Delivery', price: 8000, estimatedDays: 2 },
        ],
    },
];

export const mockMenu: Menu = {
    id: 'menu_001',
    title: 'Main Navigation',
    handle: 'main-menu',
    itemsJson: JSON.stringify([
        { title: 'New Arrivals', url: '/collections/new-arrivals' },
        { title: 'Shop All', url: '/products' },
        { title: 'Collections', url: '/collections' },
        { title: 'Blog', url: '/blog' },
    ]),
    isDefault: true,
};
