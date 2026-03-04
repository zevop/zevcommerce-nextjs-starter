import { ZevClient } from '@zevcommerce/storefront';

const ZEV_ENDPOINT = process.env.NEXT_PUBLIC_ZEV_ENDPOINT || 'http://localhost:3000/graphql/v1';

let _client: ZevClient | null = null;

/**
 * Get the ZevCommerce client singleton.
 *
 * Lazily initialized — only created when actually needed (i.e., live mode).
 * In demo mode, the API layer returns mock data before calling this, so
 * the client is never instantiated if no API key is configured.
 */
export function getZevClient(): ZevClient {
    if (!_client) {
        const key = process.env.NEXT_PUBLIC_ZEV_STOREFRONT_KEY;
        if (!key) {
            throw new Error(
                '[ZevCommerce] Missing NEXT_PUBLIC_ZEV_STOREFRONT_KEY. ' +
                'Set NEXT_PUBLIC_DEMO_MODE=true to use mock data, or provide your API key in .env.local.'
            );
        }
        _client = new ZevClient({
            endpoint: ZEV_ENDPOINT,
            publicKey: key,
            origin: process.env.NEXT_PUBLIC_STORE_ORIGIN,
        });
    }
    return _client;
}

/**
 * Proxy that lazily initializes the ZevClient on first property access.
 * This allows importing `zevClient` at module scope without triggering
 * the constructor (which throws if no API key is set).
 */
export const zevClient = new Proxy({} as ZevClient, {
    get(_, prop) {
        return (getZevClient() as unknown as Record<string | symbol, unknown>)[prop];
    },
});
