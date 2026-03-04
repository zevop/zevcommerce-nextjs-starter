import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@zevcommerce/storefront';
import { PriceDisplay } from './PriceDisplay';
import { getMediaUrl } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const defaultVariant = product.variants?.[0];
    const price = defaultVariant?.price ?? 0;
    const compareAtPrice = defaultVariant?.compareAtPrice;
    const imageUrl = getMediaUrl(product.mediaJson);

    return (
        <Link href={ROUTES.PRODUCT(product.slug)} className="group flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-hover">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">
                        No image
                    </div>
                )}
                {compareAtPrice && compareAtPrice > price && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        Sale
                    </span>
                )}
            </div>
            <div className="mt-3 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-text-primary group-hover:underline decoration-1 underline-offset-4">
                    {product.title}
                </h3>
                <PriceDisplay price={price} compareAtPrice={compareAtPrice} size="sm" />
            </div>
        </Link>
    );
}
