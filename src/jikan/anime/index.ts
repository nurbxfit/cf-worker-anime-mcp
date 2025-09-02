import { ForumFilter } from "../../types/jikan";
import HttpClient from "../../utils/http-client";
import {
    AnimeCharactersResponse,
    AnimeEpisodeResponse,
    AnimeEpisodesResponse,
    AnimeEpisodeVideosResponse,
    AnimeExternalResponse,
    AnimeForumResponse,
    AnimeFullResponse,
    AnimeMoreInfoResponse,
    AnimeNewsResponse,
    AnimePicturesResponse,
    AnimeRecommendationsResponse,
    AnimeRelationsResponse,
    AnimeResponse,
    AnimeSearchQuery,
    AnimeSearchResponse,
    AnimeStaffResponse,
    AnimeStatisticsResponse,
    AnimeVideosResponse
} from "./types";

export default class AnimeClient {
    constructor(private http: HttpClient) { }

    private path(id: number, suffix = "") {
        return `/anime/${id}${suffix}`;
    }

    getFullById(id: number) {
        return this.http.get<AnimeFullResponse>(this.path(id, "/full"));
    }

    getById(id: number) {
        return this.http.get<AnimeResponse>(this.path(id));
    }

    getCharacters(id: number) {
        return this.http.get<AnimeCharactersResponse>(this.path(id, "/characters"));
    }

    getStaff(id: number) {
        return this.http.get<AnimeStaffResponse>(this.path(id, "/staff"));
    }

    getEpisodes(id: number, page = 1) {
        return this.http.get<AnimeEpisodesResponse>(this.path(id, "/episodes"), { page });
    }

    getEpisodeById(id: number, episodeId: number) {
        return this.http.get<AnimeEpisodeResponse>(this.path(id, `/episodes/${episodeId}`));
    }

    getNews(id: number, page = 1) {
        return this.http.get<AnimeNewsResponse>(this.path(id, "/news"), { page });
    }

    getForum(id: number, filter?: ForumFilter) {
        return this.http.get<AnimeForumResponse>(this.path(id, "/forum"), { filter });
    }

    getVideos(id: number) {
        return this.http.get<AnimeVideosResponse>(this.path(id, "/videos"));
    }

    getEpisodeVideos(id: number, page = 1) {
        return this.http.get<AnimeEpisodeVideosResponse>(this.path(id, "/videos/episodes"), { page });
    }

    getPictures(id: number) {
        return this.http.get<AnimePicturesResponse>(this.path(id, "/pictures"));
    }

    getStatistics(id: number) {
        return this.http.get<AnimeStatisticsResponse>(this.path(id, "/statistics"));
    }

    getMoreInfo(id: number) {
        return this.http.get<AnimeMoreInfoResponse>(this.path(id, "/moreinfo"));
    }

    getRecommendations(id: number) {
        return this.http.get<AnimeRecommendationsResponse>(this.path(id, "/recommendations"));
    }

    getRelations(id: number) {
        return this.http.get<AnimeRelationsResponse>(this.path(id, "/relations"));
    }

    getExternal(id: number) {
        return this.http.get<AnimeExternalResponse>(this.path(id, "/external"));
    }

    getSearch(searchParams: Partial<AnimeSearchQuery>) {
        return this.http.get<AnimeSearchResponse>("/anime", searchParams);
    }
}
