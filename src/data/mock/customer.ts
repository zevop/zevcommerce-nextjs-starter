import type { CustomerProfile, CustomerAddress } from '@zevcommerce/storefront';

export const mockCustomerProfile: CustomerProfile = {
    id: 'cust_001',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+2348012345678',
};

export const mockAddresses: CustomerAddress[] = [
    {
        id: 'addr_001',
        firstName: 'Jane',
        lastName: 'Doe',
        address1: '15 Admiralty Way, Lekki Phase 1',
        city: 'Lagos',
        country: 'NG',
        isDefault: true,
    },
    {
        id: 'addr_002',
        firstName: 'Jane',
        lastName: 'Doe',
        address1: '42 Marina Road, Victoria Island',
        city: 'Lagos',
        country: 'NG',
        isDefault: false,
    },
];
