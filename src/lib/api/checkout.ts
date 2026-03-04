import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import type { Order, CheckoutVerification } from '@zevcommerce/storefront';

export async function cartCheckout(input: {
    cartId: string;
    cartAccessToken: string;
    email: string;
    shippingAddress?: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
    paymentMethodId?: string;
}): Promise<Order> {
    if (isDemoMode()) {
        return {
            id: 'order_demo_001',
            orderNumber: 'ORD-DEMO-001',
            totalAmount: 15900,
            currency: 'NGN',
            status: 'pending',
            paymentStatus: 'pending',
            paymentProvider: 'bank_transfer',
            paymentPublicKey: undefined,
            orderAccessToken: 'demo_order_token',
        } as Order;
    }
    return zevClient.checkout.cartCheckout(input);
}

export async function verifyPayment(orderId: string, orderAccessToken: string, reference: string): Promise<CheckoutVerification> {
    if (isDemoMode()) {
        return { success: true, orderId, message: 'Payment verified (demo)' };
    }
    return zevClient.checkout.verifyPayment(orderId, orderAccessToken, reference);
}

export async function getOrder(id: string, orderAccessToken: string): Promise<Order | null> {
    if (isDemoMode()) {
        return {
            id,
            orderNumber: 'ORD-DEMO-001',
            totalAmount: 15900,
            currency: 'NGN',
            status: 'pending',
            paymentStatus: 'pending',
        } as Order;
    }
    try {
        return await zevClient.checkout.getOrder(id, orderAccessToken);
    } catch {
        return null;
    }
}
