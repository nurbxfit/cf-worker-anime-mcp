import { beforeEach, describe, expect, it } from "vitest";
import HttpClient from "../../../utils/http-client";
import AnimeClient from "..";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


describe("AnimeClient Integration", () => {
    const httpClient = new HttpClient('https://api.jikan.moe/v4');
    const client = new AnimeClient(httpClient);

    beforeEach(async () => {
        await sleep(800); // 0.5s pause between calls to avoid rate limiting
    });

    // 1. Basic GET by id
    it(
        "calls AnimeClient.getById with real result",
        async () => {
            const response = await client.getById(20);

            expect(response.data.mal_id).toBe(20);
            expect(response.data.title).toContain("Naruto");
            expect(response.data).toHaveProperty("url");
        },
        10_000
    );

    // 2. Endpoint with suffix (/full)
    it(
        "calls AnimeClient.getFullById with real result",
        async () => {
            const response = await client.getFullById(20);

            expect(response.data.mal_id).toBe(20);
            expect(response.data.title).toContain("Naruto");
            expect(response.data).toHaveProperty("relations");
            expect(response.data).toHaveProperty("genres");
        },
        10_000
    );

    // 3. Pagination example
    it(
        "calls AnimeClient.getEpisodes with pagination",
        async () => {
            const response = await client.getEpisodes(20, 1);

            expect(Array.isArray(response.data)).toBe(true);
            expect(response.pagination).toHaveProperty("has_next_page");
        },
        10_000
    );

    // 4. Optional filter param
    it(
        "calls AnimeClient.getForum with filter",
        async () => {
            const response = await client.getForum(20, "episode");

            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data[0]).toHaveProperty("title");
        },
        10_000
    );

    // 5. Search endpoint
    it(
        "calls AnimeClient.getSearch with query params",
        async () => {
            const response = await client.getSearch({ q: "Naruto", limit: 1 });

            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data[0]).toHaveProperty("mal_id");
            expect(response.data[0].title).toContain("Naruto");
        },
        10_000
    );
})