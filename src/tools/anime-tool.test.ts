import { describe, expect, it, vi } from "vitest";
import JikanMoeService from "../services/jikan-service";
import AnimeTool from "./anime-tool";
import { MCPTextResponse } from "../utils/mcp-helper";

describe('AnimeTool.getTopAnimeList', () => {
    it('It takes limit argument eg: 10, then return list of top anime in mcp content format', async () => {
        const mockGet = vi.fn();
        const mockHttpClient = { get: mockGet };
        const service = new JikanMoeService(mockHttpClient as any);
        const animeTool = new AnimeTool(service);

        const query = { limit: 10 };
        const mockAnimeData = [
            {
                mal_id: 1,
                url: 'https://example.com/1',
                title: 'Anime 1',
                title_english: 'Anime One',
                title_japanese: 'アニメ1',
                score: 9.5,
                rank: 1,
                synopsis: 'Synopsis 1'
            }
            // ...add more items if needed
        ];
        mockGet.mockResolvedValueOnce({ data: mockAnimeData });

        const expectedText = mockAnimeData.map((anime) => [
            `mal_id:${anime.mal_id}`,
            `url:${anime.url}`,
            `title:${anime.title}`,
            `title_english:${anime.title_english}`,
            `title_japanese:${anime.title_japanese}`,
            `score:${anime.score}`,
            `rank:${anime.rank}`,
            `synopsis: ${anime.synopsis}`
        ]).join('\n');

        const expectedResponse = MCPTextResponse(expectedText);

        const result = await animeTool.getTopAnimeList(query);


        expect(mockGet).toHaveBeenCalledWith('/top/anime', query);
        expect(result).toEqual(expectedResponse);
    })
})