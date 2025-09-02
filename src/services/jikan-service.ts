import AnimeClient from "../jikan/anime";
import HttpClient from "../utils/http-client";

class JikanMoeService {
    public anime!: AnimeClient;
    constructor(
        private httpClient: HttpClient
    ) {
        this.anime = new AnimeClient(httpClient);
    }

}

export default JikanMoeService;

