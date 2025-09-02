import { beforeEach, describe, expect, it } from "vitest";
import HttpClient from "../../../utils/http-client";
import AnimeClient from "..";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


describe('JikanMoeService Integration', () => {

    beforeEach(async () => {
        await sleep(800); // 0.5s pause between calls to avoid rate limiting
    });
    it('integration: should return real anime search results', async () => {

        const client = new HttpClient('https://api.jikan.moe/v4');
        const service = new AnimeClient(client);

        const response = await service.getSearch({ q: 'Cowboy Bebop', limit: 1 });

        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);

        const anime = response.data[0]
        expect(anime).toHaveProperty("mal_id");
        expect(anime).toHaveProperty("title");
        // expect(response.data[0].title).toContain('Cowboy');
    });
});