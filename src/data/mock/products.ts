import type { Product, PaginationMeta } from '@zevcommerce/storefront';

export const mockProducts: Product[] = [
    {
        id: 'prod_001',
        title: 'Essential Cotton Tee',
        slug: 'essential-cotton-tee',
        description: 'A wardrobe staple crafted from 100% organic cotton. Features a relaxed fit, ribbed crew neck, and pre-shrunk fabric for lasting comfort. Available in multiple colors.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop', alt: 'White cotton t-shirt' },
            { url: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop', alt: 'Cotton tee back view' },
        ],
        variants: [
            { id: 'var_001a', title: 'Small / White', price: 3500, compareAtPrice: 4500, sku: 'ECT-WHT-S' },
            { id: 'var_001b', title: 'Medium / White', price: 3500, compareAtPrice: 4500, sku: 'ECT-WHT-M' },
            { id: 'var_001c', title: 'Large / White', price: 3500, compareAtPrice: 4500, sku: 'ECT-WHT-L' },
            { id: 'var_001d', title: 'Small / Black', price: 3500, compareAtPrice: null, sku: 'ECT-BLK-S' },
            { id: 'var_001e', title: 'Medium / Black', price: 3500, compareAtPrice: null, sku: 'ECT-BLK-M' },
        ],
    },
    {
        id: 'prod_002',
        title: 'Heavyweight Hoodie',
        slug: 'heavyweight-hoodie',
        description: 'Premium 400gsm French terry hoodie with kangaroo pocket and adjustable drawstring hood. Oversized fit for maximum comfort. Double-stitched seams for durability.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop', alt: 'Grey hoodie front' },
            { url: 'https://images.unsplash.com/photo-1578768079470-c6e1e0e36af6?w=800&h=1000&fit=crop', alt: 'Grey hoodie detail' },
        ],
        variants: [
            { id: 'var_002a', title: 'Medium / Grey', price: 8900, compareAtPrice: null, sku: 'HWH-GRY-M' },
            { id: 'var_002b', title: 'Large / Grey', price: 8900, compareAtPrice: null, sku: 'HWH-GRY-L' },
            { id: 'var_002c', title: 'XL / Grey', price: 8900, compareAtPrice: null, sku: 'HWH-GRY-XL' },
        ],
    },
    {
        id: 'prod_003',
        title: 'Slim Fit Chinos',
        slug: 'slim-fit-chinos',
        description: 'Tailored slim-fit chinos in a stretch cotton blend. Features a flat front, zip fly, and tapered leg. Perfect for both casual and smart-casual occasions.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop', alt: 'Khaki chinos' },
        ],
        variants: [
            { id: 'var_003a', title: '30 / Khaki', price: 6500, compareAtPrice: 7500, sku: 'SFC-KHK-30' },
            { id: 'var_003b', title: '32 / Khaki', price: 6500, compareAtPrice: 7500, sku: 'SFC-KHK-32' },
            { id: 'var_003c', title: '34 / Khaki', price: 6500, compareAtPrice: 7500, sku: 'SFC-KHK-34' },
            { id: 'var_003d', title: '32 / Navy', price: 6500, compareAtPrice: null, sku: 'SFC-NVY-32' },
        ],
    },
    {
        id: 'prod_004',
        title: 'Canvas Sneakers',
        slug: 'canvas-sneakers',
        description: 'Classic low-top canvas sneakers with vulcanized rubber sole. Breathable cotton upper, padded collar, and orthoLite insole for all-day comfort.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=1000&fit=crop', alt: 'White canvas sneakers' },
            { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop', alt: 'Sneakers side view' },
        ],
        variants: [
            { id: 'var_004a', title: 'US 8 / White', price: 7900, compareAtPrice: null, sku: 'CNV-WHT-8' },
            { id: 'var_004b', title: 'US 9 / White', price: 7900, compareAtPrice: null, sku: 'CNV-WHT-9' },
            { id: 'var_004c', title: 'US 10 / White', price: 7900, compareAtPrice: null, sku: 'CNV-WHT-10' },
            { id: 'var_004d', title: 'US 11 / White', price: 7900, compareAtPrice: null, sku: 'CNV-WHT-11' },
        ],
    },
    {
        id: 'prod_005',
        title: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        description: 'Minimalist crossbody bag in full-grain leather. Features adjustable strap, magnetic snap closure, and interior zip pocket. Compact yet spacious enough for everyday essentials.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', alt: 'Tan leather bag' },
        ],
        variants: [
            { id: 'var_005a', title: 'Tan', price: 12900, compareAtPrice: 15900, sku: 'LCB-TAN' },
            { id: 'var_005b', title: 'Black', price: 12900, compareAtPrice: 15900, sku: 'LCB-BLK' },
        ],
    },
    {
        id: 'prod_006',
        title: 'Denim Jacket',
        slug: 'denim-jacket',
        description: 'Classic trucker-style denim jacket in medium-wash indigo. 100% cotton denim with authentic copper rivets, button front, and chest pockets. A timeless layering piece.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop', alt: 'Denim jacket' },
        ],
        variants: [
            { id: 'var_006a', title: 'Small', price: 11500, compareAtPrice: null, sku: 'DNJ-IND-S' },
            { id: 'var_006b', title: 'Medium', price: 11500, compareAtPrice: null, sku: 'DNJ-IND-M' },
            { id: 'var_006c', title: 'Large', price: 11500, compareAtPrice: null, sku: 'DNJ-IND-L' },
        ],
    },
    {
        id: 'prod_007',
        title: 'Merino Wool Beanie',
        slug: 'merino-wool-beanie',
        description: 'Soft merino wool beanie with ribbed knit construction. Lightweight yet warm, naturally moisture-wicking and odor-resistant. One size fits most.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=1000&fit=crop', alt: 'Wool beanie' },
        ],
        variants: [
            { id: 'var_007a', title: 'Charcoal', price: 2900, compareAtPrice: null, sku: 'MWB-CHR' },
            { id: 'var_007b', title: 'Navy', price: 2900, compareAtPrice: null, sku: 'MWB-NVY' },
            { id: 'var_007c', title: 'Burgundy', price: 2900, compareAtPrice: null, sku: 'MWB-BRG' },
        ],
    },
    {
        id: 'prod_008',
        title: 'Relaxed Linen Shirt',
        slug: 'relaxed-linen-shirt',
        description: 'Breezy linen button-down with a relaxed fit and camp collar. Perfect for warm weather. Pre-washed for softness with a lived-in feel from day one.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop', alt: 'Linen shirt' },
        ],
        variants: [
            { id: 'var_008a', title: 'Small / Sand', price: 7200, compareAtPrice: null, sku: 'RLS-SND-S' },
            { id: 'var_008b', title: 'Medium / Sand', price: 7200, compareAtPrice: null, sku: 'RLS-SND-M' },
            { id: 'var_008c', title: 'Large / Sand', price: 7200, compareAtPrice: null, sku: 'RLS-SND-L' },
        ],
    },
    {
        id: 'prod_009',
        title: 'Minimal Watch',
        slug: 'minimal-watch',
        description: 'Clean-dial analog watch with Japanese quartz movement. Features a 40mm stainless steel case, scratch-resistant sapphire crystal, and genuine leather strap.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=1000&fit=crop', alt: 'Minimal watch' },
        ],
        variants: [
            { id: 'var_009a', title: 'Silver / Brown Strap', price: 18900, compareAtPrice: 22900, sku: 'MNW-SLV-BRN' },
            { id: 'var_009b', title: 'Gold / Black Strap', price: 19900, compareAtPrice: 23900, sku: 'MNW-GLD-BLK' },
        ],
    },
    {
        id: 'prod_010',
        title: 'Jogger Pants',
        slug: 'jogger-pants',
        description: 'Tapered jogger pants in a soft cotton-polyester blend. Features elastic waistband with drawstring, side pockets, and ribbed cuffs. Athleisure meets everyday wear.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=1000&fit=crop', alt: 'Black jogger pants' },
        ],
        variants: [
            { id: 'var_010a', title: 'Small / Black', price: 5500, compareAtPrice: null, sku: 'JGP-BLK-S' },
            { id: 'var_010b', title: 'Medium / Black', price: 5500, compareAtPrice: null, sku: 'JGP-BLK-M' },
            { id: 'var_010c', title: 'Large / Black', price: 5500, compareAtPrice: null, sku: 'JGP-BLK-L' },
            { id: 'var_010d', title: 'Medium / Olive', price: 5500, compareAtPrice: null, sku: 'JGP-OLV-M' },
        ],
    },
    {
        id: 'prod_011',
        title: 'Polarized Sunglasses',
        slug: 'polarized-sunglasses',
        description: 'Retro-inspired sunglasses with polarized lenses for UV400 protection. Lightweight acetate frame with spring hinges for a comfortable, secure fit.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=1000&fit=crop', alt: 'Sunglasses' },
        ],
        variants: [
            { id: 'var_011a', title: 'Tortoise', price: 9500, compareAtPrice: null, sku: 'PSG-TRT' },
            { id: 'var_011b', title: 'Matte Black', price: 9500, compareAtPrice: null, sku: 'PSG-MBK' },
        ],
    },
    {
        id: 'prod_012',
        title: 'Weekend Duffle Bag',
        slug: 'weekend-duffle-bag',
        description: 'Spacious canvas and leather duffle bag for weekend getaways. Features reinforced handles, detachable shoulder strap, interior zip pocket, and water-resistant lining.',
        mediaJson: [
            { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop', alt: 'Canvas duffle bag' },
        ],
        variants: [
            { id: 'var_012a', title: 'Army Green', price: 14900, compareAtPrice: null, sku: 'WDB-GRN' },
            { id: 'var_012b', title: 'Charcoal', price: 14900, compareAtPrice: null, sku: 'WDB-CHR' },
        ],
    },
];

export const mockProductsMeta: PaginationMeta = {
    total: mockProducts.length,
    page: 1,
    limit: 12,
    totalPages: 1,
};
