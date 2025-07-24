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
    genres?: string; // e.g. "1,2,3"
    genres_exclude?: string;
    order_by?: string;
    sort?: string;
    letter?: string;
    producers?: string;
    start_date?: string; // YYYY-MM-DD
    end_date?: string;   // YYYY-MM-DD
}

export interface AnimeSearchResponse {
    pagination: Pagination;
    data: AnimeSummary[];
}

export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    };
}

export interface AnimeSummary {
    mal_id: number;
    url: string;
    images: {
        jpg: ImageUrls;
        webp: ImageUrls;
    };
    trailer: {
        youtube_id: string;
        url: string;
        embed_url: string;
        images: {
            image_url: string;
            small_image_url: string;
            medium_image_url: string;
            large_image_url: string;
            maximum_image_url: string;
        };
    };
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: Broadcast;
    producers: Entity[];
    licensors: Entity[];
    studios: Entity[];
    genres: Entity[];
    explicit_genres: Entity[];
    themes: Entity[];
    demographics: Entity[];
}

export interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url?: string;
}

export interface Title {
    type: string;
    title: string;
}

export interface Aired {
    from: string;
    to: string;
    prop: {
        from: DateParts;
        to: DateParts;
    };
    string: string;
}

export interface DateParts {
    day: number;
    month: number;
    year: number;
}

export interface Broadcast {
    day: string;
    time: string;
    timezone: string;
    string: string;
}

export interface Entity {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}
