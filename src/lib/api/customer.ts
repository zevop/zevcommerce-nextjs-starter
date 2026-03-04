import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockCustomerProfile, mockAddresses } from '@/data/mock/customer';
import { mockOrders } from '@/data/mock/orders';
import type { CustomerProfile, CustomerAddress } from '@zevcommerce/storefront';

export async function getProfile(): Promise<CustomerProfile> {
    if (isDemoMode()) return { ...mockCustomerProfile };
    return zevClient.customer.getProfile();
}

export async function updateProfile(data: { firstName?: string; lastName?: string; phone?: string }): Promise<CustomerProfile> {
    if (isDemoMode()) return { ...mockCustomerProfile, ...data };
    return zevClient.customer.updateProfile(data.firstName, data.lastName, data.phone);
}

export async function getOrders(params?: { page?: number; limit?: number }) {
    if (isDemoMode()) {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        return {
            data: mockOrders.slice(start, start + limit),
            total: mockOrders.length,
            page,
            limit,
            totalPages: Math.ceil(mockOrders.length / limit),
        };
    }
    return zevClient.customer.getOrders(params);
}

export async function getAddresses(): Promise<CustomerAddress[]> {
    if (isDemoMode()) return [...mockAddresses];
    return zevClient.customer.getAddresses();
}

export async function addAddress(input: Record<string, unknown>): Promise<CustomerAddress> {
    if (isDemoMode()) {
        return {
            id: 'addr_new_' + Date.now(),
            firstName: String(input.firstName || ''),
            lastName: String(input.lastName || ''),
            address1: String(input.address1 || ''),
            city: String(input.city || ''),
            country: String(input.country || ''),
            isDefault: false,
        };
    }
    return zevClient.customer.addAddress(input);
}

export async function updateAddress(addressId: string, input: Record<string, unknown>): Promise<CustomerAddress> {
    if (isDemoMode()) {
        const existing = mockAddresses.find(a => a.id === addressId);
        return { ...existing!, ...input } as CustomerAddress;
    }
    return zevClient.customer.updateAddress(addressId, input);
}

export async function deleteAddress(addressId: string): Promise<{ success: boolean; message: string }> {
    if (isDemoMode()) return { success: true, message: 'Address deleted (demo)' };
    return zevClient.customer.deleteAddress(addressId);
}

export async function changePassword(input: Record<string, unknown>): Promise<{ success: boolean; message: string }> {
    if (isDemoMode()) return { success: true, message: 'Password changed (demo)' };
    return zevClient.customer.changePassword(input);
}
