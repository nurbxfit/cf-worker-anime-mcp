import { describe, it, expect, vi } from 'vitest';
import JikanMoeService from './jikan-service';

describe('JikanMoeService', () => {
    it('calls HttpClient.get with correct query', async () => {
        const mockGet = vi.fn();
        const mockHttpClient = { get: mockGet };

        const service = new JikanMoeService(mockHttpClient as any);

        const query = { q: 'Naruto', limit: 1 };
        const expectedResponse = { data: [], pagination: {} };
        mockGet.mockResolvedValueOnce(expectedResponse);

        const result = await service.getAnimeSearch(query);

        expect(mockGet).toHaveBeenCalledWith('/anime?q=Naruto&limit=1');
        expect(result).toBe(expectedResponse);
    });
});


