import { describe, expect, it } from "vitest";
import HttpClient from "../utils/http-client";
import JikanMoeService from "./jikan-service";

describe('JikanMoeService Integration', () => {
    it('should return real anime search results from Jikan API', async () => {
        const client = new HttpClient('https://api.jikan.moe/v4');
        const service = new JikanMoeService(client);

        const response = await service.getAnimeSearch({ q: 'Cowboy Bebop', limit: 1 });
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0].title).toContain('Cowboy');
    });
});