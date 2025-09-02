import { describe, it, expect, vi } from 'vitest';
import AnimeClient from '..';

describe('AnimeClient getSearch', () => {
    it('calls HttpClient.get with correct query', async () => {
        const mockGet = vi.fn();
        const mockHttpClient = { get: mockGet };

        const client = new AnimeClient(mockHttpClient as any);

        const query = { q: 'Naruto', limit: 1 };
        const expectedResponse = { data: [], pagination: {} };
        mockGet.mockResolvedValueOnce(expectedResponse);

        const result = await client.getSearch(query);

        expect(mockGet).toHaveBeenCalledWith("/anime", query);
        expect(result).toBe(expectedResponse);
    });
});
