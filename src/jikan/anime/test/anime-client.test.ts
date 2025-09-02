import { describe, it, expect, vi, beforeEach } from "vitest";
import AnimeClient from "../index"; // adjust import if needed

describe("AnimeClient", () => {
    const mockGet = vi.fn();
    const mockHttpClient = { get: mockGet };

    beforeEach(() => {
        mockGet.mockReset();
    });

    // 1. Basic GET by id
    it("calls HttpClient.get with correct path for getById", async () => {
        const client = new AnimeClient(mockHttpClient as any);
        const mockResponse = { data: { mal_id: 1, title: "Naruto" } };
        mockGet.mockResolvedValueOnce(mockResponse);

        const result = await client.getById(1);

        expect(mockGet).toHaveBeenCalledWith("/anime/1");
        expect(result).toBe(mockResponse);
    });

    // 2. Endpoint with suffix (/full)
    it("calls HttpClient.get with /full suffix for getFullById", async () => {
        const client = new AnimeClient(mockHttpClient as any);
        mockGet.mockResolvedValueOnce({ data: {} });

        await client.getFullById(1);

        expect(mockGet).toHaveBeenCalledWith("/anime/1/full");
    });

    // 3. Endpoint with pagination param
    it("passes page param for getEpisodes", async () => {
        const client = new AnimeClient(mockHttpClient as any);
        mockGet.mockResolvedValueOnce({ data: [] });

        await client.getEpisodes(1, 2);

        expect(mockGet).toHaveBeenCalledWith("/anime/1/episodes", { page: 2 });
    });

    // 4. Endpoint with optional filter param
    it("passes filter param for getForum", async () => {
        const client = new AnimeClient(mockHttpClient as any);
        mockGet.mockResolvedValueOnce({ data: [] });

        await client.getForum(1, "episode");

        expect(mockGet).toHaveBeenCalledWith("/anime/1/forum", { filter: "episode" });
    });

    // 5. Search endpoint
    it("calls /anime with query params for getSearch", async () => {
        const client = new AnimeClient(mockHttpClient as any);
        const query = { q: "Naruto", limit: 5 };
        mockGet.mockResolvedValueOnce({ data: [] });

        await client.getSearch(query);

        expect(mockGet).toHaveBeenCalledWith("/anime", query);
    });
});
