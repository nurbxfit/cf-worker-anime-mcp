import JikanMoeService from "../services/jikan-service";
import { MCPTextResponse } from "../utils/mcp-helper";

class MangaTool {
    constructor(protected jikanMoeService: JikanMoeService) { }

    async getTopManga({ limit }: { limit: number }) {
        const result = await this.jikanMoeService.top.getManga({
            limit
        });

        const mangaList = result.data;
        const formattedMangaList = mangaList.map((manga) => [
            `mal_id: ${manga.mal_id}`,
            `url: ${manga.url}`,
            `title: ${manga.title}`,
            `score:${manga.score}`,
            `rank:${manga.rank}`,
            `synopsis: ${manga.synopsis}`
        ]).join('\n');

        return MCPTextResponse(formattedMangaList);
    }
}

export default MangaTool;