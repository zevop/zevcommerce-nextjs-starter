import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockCustomerProfile } from '@/data/mock/customer';
import type { AuthResponse, AuthMessage } from '@zevcommerce/storefront';

export async function login(email: string, password: string): Promise<AuthResponse> {
    if (isDemoMode()) {
        return {
            accessToken: 'demo_jwt_token_' + Date.now(),
            customer: { ...mockCustomerProfile, email },
        };
    }
    return zevClient.auth.login(email, password);
}

export async function register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string,
): Promise<AuthResponse> {
    if (isDemoMode()) {
        return {
            accessToken: 'demo_jwt_token_' + Date.now(),
            customer: { id: 'cust_new', email, firstName, lastName },
        };
    }
    return zevClient.auth.register(email, password, firstName, lastName, phone);
}

export async function forgotPassword(email: string): Promise<AuthMessage> {
    if (isDemoMode()) {
        return { success: true, message: 'If this email exists, a reset code has been sent. (Demo mode)' };
    }
    return zevClient.auth.forgotPassword(email);
}

export async function verifyOtp(email: string, code: string): Promise<AuthMessage> {
    if (isDemoMode()) {
        return { success: true, message: 'OTP verified. (Demo mode)' };
    }
    return zevClient.auth.verifyOtp(email, code);
}

export async function resetPassword(email: string, code: string, newPassword: string): Promise<AuthMessage> {
    if (isDemoMode()) {
        return { success: true, message: 'Password has been reset. (Demo mode)' };
    }
    return zevClient.auth.resetPassword(email, code, newPassword);
}
