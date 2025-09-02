import AnimeClient from "../jikan/anime";
import TopClient from "../jikan/top";
import HttpClient from "../utils/http-client";

class JikanMoeService {
    public anime!: AnimeClient;
    public top!: TopClient;
    constructor(
        private httpClient: HttpClient
    ) {
        this.anime = new AnimeClient(httpClient);
        this.top = new TopClient(httpClient);
    }

}

export default JikanMoeService;

