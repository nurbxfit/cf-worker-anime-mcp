import { describe, expect, it } from "vitest";
import HttpClient from "../utils/http-client";
import JikanMoeService from "../services/jikan-service";
import AnimeTool from "./anime-tool";

describe('AnimeTool.getTopAnimeList Integration', () => {
    it('should return MCP formmated result from Jikan API', async () => {
        const client = new HttpClient('https://api.jikan.moe/v4');
        const service = new JikanMoeService(client);
        const animeTool = new AnimeTool(service);

        const query = { limit: 10 };
        const response = await animeTool.getTopAnimeList(query);

        console.log('result:', response);

        expect(response.content[0].text).toContain('mal_id');
    })
});