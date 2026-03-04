'use client';

import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { CustomerAddress } from '@zevcommerce/storefront';

interface AddressCardProps {
    address: CustomerAddress;
    onEdit: (address: CustomerAddress) => void;
    onDelete: (addressId: string) => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
    return (
        <div className="rounded-lg border border-border-light p-4">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-text-secondary shrink-0" />
                    <span className="text-sm font-semibold text-text-primary">
                        {address.firstName} {address.lastName}
                    </span>
                </div>
                {address.isDefault && <Badge variant="success">Default</Badge>}
            </div>
            <p className="text-sm text-text-secondary ml-6">{address.address1}</p>
            <p className="text-sm text-text-secondary ml-6">
                {address.city}{address.country ? `, ${address.country}` : ''}
            </p>
            <div className="flex items-center gap-2 mt-3 ml-6">
                <button
                    onClick={() => onEdit(address)}
                    className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-brand transition-colors"
                >
                    <Pencil size={12} /> Edit
                </button>
                <button
                    onClick={() => onDelete(address.id)}
                    className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-red-600 transition-colors"
                >
                    <Trash2 size={12} /> Delete
                </button>
            </div>
        </div>
    );
}
