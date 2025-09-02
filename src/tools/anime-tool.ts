import JikanMoeService from "../services/jikan-service";
import { MCPTextResponse } from "../utils/mcp-helper";

class AnimeTool {
    constructor(
        protected jikanMoeService: JikanMoeService
    ) { }

    async getTopAnimeList({ limit }: { limit: number }) {
        const result = await this.jikanMoeService.top.getAnime({
            limit
        })

        const animeList = result.data;
        const formattedAnimeList = animeList.map((anime) => [
            `mal_id:${anime.mal_id}`,
            `url:${anime.url}`,
            `title:${anime.title}`,
            `title_english:${anime.title_english}`,
            `title_japanese:${anime.title_japanese}`,
            `score:${anime.score}`,
            `rank:${anime.rank}`,
            `synopsis: ${anime.synopsis}`
        ]).join('\n');

        return MCPTextResponse(formattedAnimeList);
    }

}

export default AnimeTool;

// export const animeTool = new AnimeTool(new JikanMoeService(new HttpClient('https://api.jikan.moe/v4')));

