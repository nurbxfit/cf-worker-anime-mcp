import HttpClient from "../../utils/http-client";
import {
    TopAnimeQuery,
    TopMangaQuery,
    TopCharactersQuery,
    TopPeopleQuery,
    TopAnimeResponse,
    TopMangaResponse,
    TopCharactersResponse,
    TopPeopleResponse,
} from "./types";

export default class TopClient {
    constructor(private http: HttpClient) { }

    getAnime(query: TopAnimeQuery = {}) {
        return this.http.get<TopAnimeResponse>("/top/anime", query);
    }

    getManga(query: TopMangaQuery = {}) {
        return this.http.get<TopMangaResponse>("/top/manga", query);
    }

    getCharacters(query: TopCharactersQuery = {}) {
        return this.http.get<TopCharactersResponse>("/top/characters", query);
    }

    getPeople(query: TopPeopleQuery = {}) {
        return this.http.get<TopPeopleResponse>("/top/people", query);
    }
}
