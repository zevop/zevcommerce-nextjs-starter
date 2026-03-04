'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Truck, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { AddressForm, type AddressFormData } from '@/components/checkout/AddressForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPrice } from '@/lib/utils';
import { cartCheckout } from '@/lib/api/checkout';
import { getShippingRates, getPaymentMethods } from '@/lib/api/storefront';
import { ROUTES } from '@/lib/constants';
import type { ShippingRate, PaymentMethod, Order } from '@zevcommerce/storefront';

const STEPS = ['Information', 'Shipping', 'Payment', 'Confirmation'];

const emptyAddress: AddressFormData = {
    firstName: '', lastName: '', address1: '', city: '', state: '', country: 'NG', zip: '', phone: '',
};

export default function CheckoutPage() {
    const { cart } = useCart();
    const { addToast } = useToast();
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState<AddressFormData>(emptyAddress);
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [selectedRateId, setSelectedRateId] = useState('');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [order, setOrder] = useState<Order | null>(null);

    if (!cart || cart.lines.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <EmptyState
                    title="Nothing to checkout"
                    description="Your cart is empty. Add some products before proceeding to checkout."
                    actionLabel="Browse Products"
                    actionHref={ROUTES.PRODUCTS}
                />
            </div>
        );
    }

    const handleInfoSubmit = async () => {
        if (!email || !address.firstName || !address.lastName || !address.address1 || !address.city) {
            addToast('Please fill in all required fields', 'error');
            return;
        }
        setIsLoading(true);
        try {
            const rates = await getShippingRates(address.country, address.state, address.city, cart.subtotal);
            setShippingRates(rates);
            if (rates.length > 0) setSelectedRateId(rates[0].id);
            setStep(1);
        } catch {
            addToast('Failed to load shipping rates', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShippingSubmit = async () => {
        setIsLoading(true);
        try {
            const methods = await getPaymentMethods();
            setPaymentMethods(methods);
            if (methods.length > 0) setSelectedPayment(methods[0].provider);
            setStep(2);
        } catch {
            addToast('Failed to load payment methods', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        try {
            const result = await cartCheckout({
                cartId: cart.id,
                cartAccessToken: cart.accessToken,
                email,
                shippingAddress: address as unknown as Record<string, unknown>,
                paymentMethodId: selectedPayment,
            });
            setOrder(result);
            setStep(3);
            addToast('Order placed successfully!');
        } catch {
            addToast('Failed to place order. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const selectedRate = shippingRates.find(r => r.id === selectedRateId);
    const selectedMethod = paymentMethods.find(m => m.provider === selectedPayment);

    return (
        <div className="bg-surface">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '1440px' }}>
                <h1 className="text-2xl font-bold text-text-primary">Checkout</h1>

                <CheckoutSteps currentStep={step} steps={STEPS} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">

                        {/* Step 0: Information */}
                        {step === 0 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <User size={18} /> Contact & Shipping
                                    </h2>
                                    <Input
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Shipping Address</h3>
                                    <AddressForm data={address} onChange={setAddress} />
                                </div>
                                <Button variant="primary" size="lg" onClick={handleInfoSubmit} isLoading={isLoading} className="w-full sm:w-auto">
                                    Continue to Shipping <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Truck size={18} /> Shipping Method
                                </h2>
                                {shippingRates.length === 0 ? (
                                    <p className="text-sm text-text-secondary">No shipping rates available for your address.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {shippingRates.map(rate => (
                                            <label
                                                key={rate.id}
                                                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedRateId === rate.id ? 'border-brand bg-brand-50' : 'border-border-light hover:border-brand/30'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        checked={selectedRateId === rate.id}
                                                        onChange={() => setSelectedRateId(rate.id)}
                                                        className="accent-brand"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-text-primary">{rate.name}</p>
                                                        {rate.estimatedDays && (
                                                            <p className="text-xs text-text-secondary">{rate.estimatedDays} business day{rate.estimatedDays > 1 ? 's' : ''}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-sm font-semibold">{formatPrice(rate.price)}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setStep(0)}>
                                        <ArrowLeft size={16} className="mr-2" /> Back
                                    </Button>
                                    <Button variant="primary" size="lg" onClick={handleShippingSubmit} isLoading={isLoading}>
                                        Continue to Payment <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <CreditCard size={18} /> Payment Method
                                </h2>
                                {paymentMethods.length === 0 ? (
                                    <p className="text-sm text-text-secondary">No payment methods configured.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {paymentMethods.map(method => (
                                            <label
                                                key={method.provider}
                                                className={`block p-4 rounded-lg border cursor-pointer transition-colors ${selectedPayment === method.provider ? 'border-brand bg-brand-50' : 'border-border-light hover:border-brand/30'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={selectedPayment === method.provider}
                                                        onChange={() => setSelectedPayment(method.provider)}
                                                        className="accent-brand"
                                                    />
                                                    <span className="text-sm font-medium text-text-primary capitalize">
                                                        {method.provider.replace(/_/g, ' ')}
                                                    </span>
                                                </div>
                                                {selectedPayment === method.provider && method.paymentInstructions && (
                                                    <div className="mt-3 ml-7 p-3 rounded-md bg-surface-hover text-sm text-text-secondary whitespace-pre-line">
                                                        {method.paymentInstructions}
                                                    </div>
                                                )}
                                                {selectedPayment === method.provider && method.additionalDetails && (
                                                    <div className="mt-2 ml-7 p-3 rounded-md bg-surface-muted text-xs text-text-secondary font-mono whitespace-pre-line">
                                                        {method.additionalDetails}
                                                    </div>
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setStep(1)}>
                                        <ArrowLeft size={16} className="mr-2" /> Back
                                    </Button>
                                    <Button variant="primary" size="lg" onClick={handlePlaceOrder} isLoading={isLoading}>
                                        Place Order
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && order && (
                            <div className="text-center py-8">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle size={56} className="text-green-600" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-bold text-text-primary mb-2">Order Confirmed!</h2>
                                <p className="text-text-secondary mb-1">
                                    Order <span className="font-semibold">{order.orderNumber}</span>
                                </p>
                                <p className="text-sm text-text-secondary mb-6">
                                    We&apos;ve received your order. You&apos;ll get a confirmation email at <strong>{email}</strong>.
                                </p>
                                {selectedMethod?.paymentInstructions && (
                                    <div className="max-w-md mx-auto mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-left">
                                        <p className="text-sm font-medium text-amber-800 mb-1">Payment Instructions</p>
                                        <p className="text-sm text-amber-700 whitespace-pre-line">{selectedMethod.paymentInstructions}</p>
                                        {selectedMethod.additionalDetails && (
                                            <p className="mt-2 text-xs text-amber-600 font-mono whitespace-pre-line">{selectedMethod.additionalDetails}</p>
                                        )}
                                    </div>
                                )}
                                <Link href={ROUTES.PRODUCTS}>
                                    <Button variant="primary">Continue Shopping</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Order Summary */}
                    {step < 3 && (
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 border border-border-light rounded-lg p-6 space-y-4">
                                <h3 className="text-base font-semibold text-text-primary">Order Summary</h3>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {cart.lines.map(line => (
                                        <div key={line.variantId} className="flex justify-between text-sm">
                                            <div>
                                                <p className="text-text-primary">{line.productTitle}</p>
                                                {line.variantTitle && <p className="text-xs text-text-secondary">{line.variantTitle}</p>}
                                                <p className="text-xs text-text-secondary">Qty: {line.quantity}</p>
                                            </div>
                                            <span className="font-medium shrink-0 ml-4">{formatPrice(line.lineTotal)}</span>
                                        </div>
                                    ))}
                                </div>
                                <hr className="border-border-light" />
                                <CartSummary cart={cart} />
                                {selectedRate && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Shipping</span>
                                        <span className="font-medium">{formatPrice(selectedRate.price)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
