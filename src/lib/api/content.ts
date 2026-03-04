import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockPages, mockBlogs, mockArticles } from '@/data/mock/content';
import type { Page, Blog, Article } from '@zevcommerce/storefront';

export async function getPages(): Promise<Page[]> {
    if (isDemoMode()) return mockPages;
    return zevClient.content.getPages();
}

export async function getPage(slug: string): Promise<Page | null> {
    if (isDemoMode()) return mockPages.find(p => p.slug === slug) || null;
    try {
        return await zevClient.content.getPage(slug);
    } catch {
        return null;
    }
}

export async function getBlogs(): Promise<Blog[]> {
    if (isDemoMode()) return mockBlogs;
    return zevClient.content.getBlogs();
}

export async function getArticles(params?: { blogHandle?: string; page?: number; limit?: number }): Promise<Article[]> {
    if (isDemoMode()) return mockArticles;
    return zevClient.content.getArticles(params);
}

export async function getArticle(slug: string): Promise<Article | null> {
    if (isDemoMode()) return mockArticles.find(a => a.slug === slug) || null;
    // The SDK doesn't have a getArticle(slug) method directly,
    // so we fetch all articles and filter. In production, you may want
    // to add this method to the SDK.
    try {
        const articles = await zevClient.content.getArticles();
        return articles.find((a: Article) => a.slug === slug) || null;
    } catch {
        return null;
    }
}
