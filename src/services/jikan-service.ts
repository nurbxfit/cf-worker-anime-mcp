import { AnimeSearchQuery, AnimeSearchResponse } from "../types/jikan";
import HttpClient from "../utils/http-client";
import { queryObjectToQueryString } from "../utils/request-query";

class JikanMoeService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    async getAnimeSearch(query: AnimeSearchQuery) {
        const queryString = queryObjectToQueryString(query);
        const path = `/anime${queryString ? `?${queryString}` : ''}`
        return this.httpClient.get<AnimeSearchResponse>(path);
    }
}

export default JikanMoeService;

