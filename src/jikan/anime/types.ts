// Generic wrapper for API responses
export interface ApiResponse<T> {
    data: T;
}

// ---------------- Anime Core ----------------
export interface Anime {
    mal_id: number;
    url: string;
    images: {
        jpg: { image_url: string; small_image_url: string; large_image_url: string };
        webp: { image_url: string; small_image_url: string; large_image_url: string };
    };
    title: string;
    title_english?: string | null;
    title_japanese?: string | null;
    title_synonyms?: string[];
    type?: string | null;
    source?: string | null;
    episodes?: number | null;
    status?: string | null;
    airing?: boolean;
    duration?: string | null;
    rating?: string | null;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    synopsis?: string | null;
    background?: string | null;
    season?: string | null;
    year?: number | null;
}

// Extended Anime (for /anime/{id}/full)
export interface AnimeFull extends Anime {
    genres: Genre[];
    explicit_genres: Genre[];
    themes: Genre[];
    demographics: Genre[];
    relations: Relation[];
    theme: {
        openings: string[];
        endings: string[];
    };
    external: ExternalLink[];
    streaming: ExternalLink[];
}

export type AnimeResponse = ApiResponse<Anime>;
export type AnimeFullResponse = ApiResponse<AnimeFull>;

// ---------------- Characters ----------------
export interface AnimeCharacter {
    character: {
        mal_id: number;
        url: string;
        images: {
            jpg: { image_url: string };
        };
        name: string;
    };
    role: string;
    voice_actors?: Array<{
        person: {
            mal_id: number;
            url: string;
            images: {
                jpg: { image_url: string };
            };
            name: string;
        };
        language: string;
    }>;
}

export interface AnimeCharactersResponse {
    data: AnimeCharacter[];
}

// ---------------- Staff ----------------
export interface AnimeStaff {
    person: {
        mal_id: number;
        url: string;
        images: {
            jpg: { image_url: string };
        };
        name: string;
    };
    positions: string[];
}

export interface AnimeStaffResponse {
    data: AnimeStaff[];
}

// ---------------- Episodes ----------------
export interface AnimeEpisode {
    mal_id: number;
    title: string;
    title_japanese?: string | null;
    title_romanji?: string | null;
    aired: string | null;
    filler: boolean;
    recap: boolean;
    url: string;
}

export interface AnimeEpisodesResponse {
    data: AnimeEpisode[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        items: { count: number; total: number; per_page: number };
    };
}

export type AnimeEpisodeResponse = ApiResponse<AnimeEpisode>;

// ---------------- News ----------------
export interface AnimeNews {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_username: string;
    author_url: string;
    forum_url: string;
    images: {
        jpg: { image_url: string };
    };
    comments: number;
    excerpt: string;
}

export interface AnimeNewsResponse {
    data: AnimeNews[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
}

// ---------------- Forum ----------------
export interface ForumTopic {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_username: string;
    author_url: string;
    comments: number;
}

export interface AnimeForumResponse {
    data: ForumTopic[];
}

// ---------------- Videos ----------------
export interface AnimeVideos {
    promo: Array<{
        title: string;
        trailer: {
            url: string | null;
            embed_url: string | null;
            images: { image_url: string | null };
        };
    }>;
    episodes: Array<{
        title: string;
        episode: string;
        url: string;
        images: { jpg: { image_url: string } };
    }>;
}

export type AnimeVideosResponse = ApiResponse<AnimeVideos>;

export interface AnimeEpisodeVideo {
    title: string;
    episode: string;
    url: string;
    images: { jpg: { image_url: string } };
}

export interface AnimeEpisodeVideosResponse {
    data: AnimeEpisodeVideo[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
}

// ---------------- Pictures ----------------
export interface AnimePicturesResponse {
    data: Array<{
        jpg: { image_url: string };
        webp: { image_url: string };
    }>;
}

// ---------------- Statistics ----------------
export interface AnimeStatistics {
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
    total: number;
    scores: Record<number, { votes: number; percentage: number }>;
}

export type AnimeStatisticsResponse = ApiResponse<AnimeStatistics>;

// ---------------- More Info ----------------
export interface AnimeMoreInfoResponse {
    data: { moreinfo: string | null };
}

// ---------------- Recommendations ----------------
export interface AnimeRecommendation {
    entry: {
        mal_id: number;
        url: string;
        images: { jpg: { image_url: string } };
        title: string;
    };
    url: string;
    votes: number;
}

export interface AnimeRecommendationsResponse {
    data: AnimeRecommendation[];
}

// ---------------- Relations ----------------
export interface Relation {
    relation: string;
    entry: Array<{
        mal_id: number;
        url: string;
        type: string;
        name: string;
    }>;
}

export interface AnimeRelationsResponse {
    data: Relation[];
}

// ---------------- External Links ----------------
export interface ExternalLink {
    name: string;
    url: string;
}

export interface AnimeExternalResponse {
    data: ExternalLink[];
}

// ---------------- Search ----------------
export interface AnimeSearchQuery {
    q?: string;
    page?: number;
    limit?: number;
    type?: string;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: string;
    rating?: string;
    sfw?: boolean;
    genres?: string;
    order_by?: string;
    sort?: "asc" | "desc";
    letter?: string;
    producers?: string;
    start_date?: string;
    end_date?: string;
}

export interface AnimeSearchResponse {
    data: Anime[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        items: { count: number; total: number; per_page: number };
    };
}

// ---------------- Supporting Types ----------------
export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}
