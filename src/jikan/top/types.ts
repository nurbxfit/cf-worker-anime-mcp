import { Anime } from "../anime/types";

export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    items: { count: number; total: number; per_page: number };
}

export interface TopAnimeQuery {
    page?: number;
    limit?: number;
    type?: string; // e.g. "tv", "movie", "ova"
    filter?: string; // e.g. "airing", "upcoming", "bypopularity", "favorite"
    rating?: string; // e.g. "g", "pg13", "r17", etc.
    sfw?: boolean;
}

export interface TopMangaQuery {
    page?: number;
    limit?: number;
    type?: string; // e.g. "manga", "novel", "manhwa", etc.
    filter?: string; // e.g. "publishing", "upcoming", "bypopularity", "favorite"
}

export interface TopCharactersQuery {
    page?: number;
    limit?: number;
}

export interface TopPeopleQuery {
    page?: number;
    limit?: number;
}

export interface TopAnimeResponse {
    data: Anime[];
    pagination: Pagination;
}

export interface TopMangaResponse {
    data: Manga[];
    pagination: Pagination;
}

export interface TopCharactersResponse {
    data: Character[];
    pagination: Pagination;
}

export interface TopPeopleResponse {
    data: Person[];
    pagination: Pagination;
}

// --- Reuse from your existing Anime/Manga/Character/Person types ---
// e.g. import { Anime } from "../anime/types";
// (Or define minimal subsets if needed)


export interface Manga {
    mal_id: number;
    url: string;
    title: string;
    score?: number;
    rank?: number;
    images: { jpg: { image_url: string } };
}

export interface Character {
    mal_id: number;
    url: string;
    name: string;
    favorites?: number;
    images: { jpg: { image_url: string } };
}

export interface Person {
    mal_id: number;
    url: string;
    name: string;
    favorites?: number;
    images: { jpg: { image_url: string } };
}
