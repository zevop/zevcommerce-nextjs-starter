'use client';

import { useState, useEffect } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { AddressCard } from '@/components/account/AddressCard';
import { AddressForm, type AddressFormData } from '@/components/checkout/AddressForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/contexts/ToastContext';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '@/lib/api/customer';
import type { CustomerAddress } from '@zevcommerce/storefront';

const emptyAddress: AddressFormData = {
    firstName: '', lastName: '', address1: '', city: '', state: '', country: 'NG', zip: '', phone: '',
};

export default function AddressesPage() {
    const { addToast } = useToast();
    const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<AddressFormData>(emptyAddress);

    useEffect(() => {
        getAddresses()
            .then(setAddresses)
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, []);

    const openNew = () => {
        setEditingId(null);
        setForm(emptyAddress);
        setModalOpen(true);
    };

    const openEdit = (addr: CustomerAddress) => {
        setEditingId(addr.id);
        setForm({
            firstName: addr.firstName,
            lastName: addr.lastName,
            address1: addr.address1,
            city: addr.city,
            state: '',
            country: addr.country,
            zip: '',
            phone: '',
        });
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!form.firstName || !form.address1 || !form.city) {
            addToast('Please fill required fields', 'error');
            return;
        }
        setIsSaving(true);
        try {
            if (editingId) {
                const updated = await updateAddress(editingId, form as unknown as Record<string, unknown>);
                setAddresses(prev => prev.map(a => a.id === editingId ? updated : a));
                addToast('Address updated');
            } else {
                const created = await addAddress(form as unknown as Record<string, unknown>);
                setAddresses(prev => [...prev, created]);
                addToast('Address added');
            }
            setModalOpen(false);
        } catch {
            addToast('Failed to save address', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteAddress(id);
            setAddresses(prev => prev.filter(a => a.id !== id));
            addToast('Address deleted');
        } catch {
            addToast('Failed to delete address', 'error');
        }
    };

    if (isLoading) {
        return (
            <div className="w-full space-y-8">
                <AccountPageHeader title="Addresses" />
                <div className="w-full space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            <AccountPageHeader title="Addresses" description="Manage your shipping addresses for faster checkout.">
                <Button variant="outline" size="sm" onClick={openNew}>
                    <Plus size={14} className="mr-1" /> Add Address
                </Button>
            </AccountPageHeader>

            {addresses.length === 0 ? (
                <EmptyState
                    icon={<MapPin size={48} strokeWidth={1.5} />}
                    title="No saved addresses"
                    description="Add a shipping address to speed up checkout."
                    actionLabel="Add Address"
                    onAction={openNew}
                />
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map(addr => (
                        <AddressCard
                            key={addr.id}
                            address={addr}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Address' : 'New Address'}>
                <div className="space-y-4">
                    <AddressForm data={form} onChange={setForm} />
                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                            {editingId ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
