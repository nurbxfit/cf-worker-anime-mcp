import JikanMoeService from "../services/jikan-service";
import { MCPTextResponse } from "../utils/mcp-helper";

class MangaTool {
    constructor(protected jikanMoeService: JikanMoeService) { }

    async getTopManga({ limit }: { limit: number }) {
        const result = await this.jikanMoeService.top.getManga({
            limit
        });

        const mangeList = result.data;
        const formattedMangeList = mangeList.map((manga) => [
            `mal_id: ${manga.mal_id}`,
            `url: ${manga.url}`,
            `title: ${manga.title}`,
            `score:${manga.score}`,
            `rank:${manga.rank}`,
            `synopsis: ${manga.synopsis}`
        ]).join('\n');

        return MCPTextResponse(formattedMangeList);
    }
}

export default MangaTool;