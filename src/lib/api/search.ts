import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockSearch } from '@/data/mock/search';
import type { SearchResults } from '@zevcommerce/storefront';

export async function search(term: string, limit?: number): Promise<SearchResults> {
    if (isDemoMode()) return mockSearch(term, limit);
    return zevClient.search.query(term, limit);
}
