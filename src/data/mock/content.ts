import type { Page, Blog, Article } from '@zevcommerce/storefront';

export const mockPages: Page[] = [
    {
        id: 'page_001',
        title: 'About Us',
        slug: 'about',
        content: '<h2>Our Story</h2><p>Founded with a simple belief: great style shouldn\'t be complicated. We curate quality essentials that work harder, last longer, and look effortlessly good.</p><h2>Our Mission</h2><p>To make thoughtfully designed, sustainably made fashion accessible to everyone. Every piece in our collection is crafted with care — from fabric selection to final stitch.</p><h2>Quality Promise</h2><p>We partner with ethical manufacturers and use premium materials. If something doesn\'t meet our standards, it doesn\'t make it to the shelf.</p>',
    },
    {
        id: 'page_002',
        title: 'Shipping & Returns',
        slug: 'shipping-returns',
        content: '<h2>Shipping</h2><p>We offer standard and express delivery across Nigeria. Orders are processed within 1-2 business days.</p><ul><li><strong>Standard Delivery:</strong> 3-5 business days</li><li><strong>Express Delivery:</strong> 1-2 business days</li></ul><h2>Returns</h2><p>Not happy with your purchase? Return any unworn item within 14 days for a full refund. Items must be in original condition with tags attached.</p><p>To initiate a return, contact our support team with your order number.</p>',
    },
    {
        id: 'page_003',
        title: 'FAQ',
        slug: 'faq',
        content: '<h2>Frequently Asked Questions</h2><h3>How do I track my order?</h3><p>Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in your account dashboard.</p><h3>Do you ship internationally?</h3><p>Currently we ship within Nigeria only. International shipping coming soon.</p><h3>How do I change my order?</h3><p>Contact us within 2 hours of placing your order and we\'ll do our best to accommodate changes.</p>',
    },
    {
        id: 'page_004',
        title: 'Terms of Service',
        slug: 'terms',
        content: '<h2>Terms of Service</h2><p>By using our website and purchasing our products, you agree to these terms. We reserve the right to update these terms at any time.</p><p>All products are subject to availability. Prices are listed in Nigerian Naira (NGN) and include applicable taxes.</p>',
    },
];

export const mockBlogs: Blog[] = [
    {
        id: 'blog_001',
        title: 'Style Journal',
        handle: 'style-journal',
        articleCount: 3,
    },
];

export const mockArticles: Article[] = [
    {
        id: 'article_001',
        title: 'Building a Capsule Wardrobe: The Essential Guide',
        slug: 'building-capsule-wardrobe',
        excerpt: 'Learn how to build a versatile capsule wardrobe with just 30 pieces that work for every occasion.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=500&fit=crop',
        author: 'Style Team',
        publishedAt: '2026-01-15T10:00:00Z',
    },
    {
        id: 'article_002',
        title: '5 Ways to Style a White T-Shirt',
        slug: '5-ways-style-white-tshirt',
        excerpt: 'The humble white tee is the most versatile piece in your closet. Here are five ways to make it work for any occasion.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=500&fit=crop',
        author: 'Style Team',
        publishedAt: '2026-02-01T10:00:00Z',
    },
    {
        id: 'article_003',
        title: 'Sustainable Fashion: What It Means and Why It Matters',
        slug: 'sustainable-fashion-guide',
        excerpt: 'Understanding the impact of your fashion choices and how to shop more consciously without sacrificing style.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
        author: 'Style Team',
        publishedAt: '2026-02-10T10:00:00Z',
    },
];
