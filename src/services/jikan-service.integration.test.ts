import { beforeEach, describe, expect, it } from "vitest";
import HttpClient from "../utils/http-client";
import JikanMoeService from "./jikan-service";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

describe('JikanMoeService Integration', () => {

    beforeEach(async () => {
        await sleep(800); // 0.5s pause between calls to avoid rate limiting
    });

    it('should return real anime search results from Jikan API', async () => {
        const client = new HttpClient('https://api.jikan.moe/v4');
        const service = new JikanMoeService(client);

        const response = await service.anime.getSearch({ q: 'Cowboy Bebop', limit: 1 });
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0].title).toContain('Cowboy');
    });
});