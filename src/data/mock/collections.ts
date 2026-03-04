import type { Collection } from '@zevcommerce/storefront';

export const mockCollections: Collection[] = [
    {
        id: 'col_001',
        title: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'The latest additions to our collection. Fresh styles and seasonal essentials just landed.',
        productCount: 6,
    },
    {
        id: 'col_002',
        title: 'Essentials',
        slug: 'essentials',
        description: 'Timeless basics that form the foundation of any wardrobe. Built to last, designed to mix and match.',
        productCount: 8,
    },
    {
        id: 'col_003',
        title: 'Outerwear',
        slug: 'outerwear',
        description: 'Jackets, hoodies, and layers for every season. From lightweight shells to heavyweight warmth.',
        productCount: 4,
    },
    {
        id: 'col_004',
        title: 'Accessories',
        slug: 'accessories',
        description: 'The finishing touches. Bags, watches, sunglasses, and more to complete your look.',
        productCount: 5,
    },
    {
        id: 'col_005',
        title: 'Sale',
        slug: 'sale',
        description: 'Great style at great prices. Shop our current markdowns before they are gone.',
        productCount: 4,
    },
];

/** Map of collection slug → product IDs for demo mode */
export const mockCollectionProducts: Record<string, string[]> = {
    'new-arrivals': ['prod_001', 'prod_004', 'prod_008', 'prod_009', 'prod_011', 'prod_012'],
    'essentials': ['prod_001', 'prod_002', 'prod_003', 'prod_007', 'prod_008', 'prod_010', 'prod_004', 'prod_006'],
    'outerwear': ['prod_002', 'prod_006', 'prod_007', 'prod_008'],
    'accessories': ['prod_005', 'prod_009', 'prod_011', 'prod_012', 'prod_007'],
    'sale': ['prod_001', 'prod_003', 'prod_005', 'prod_009'],
};
