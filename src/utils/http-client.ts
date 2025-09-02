class HttpClient {
    constructor(
        protected baseUrl: string,
        protected headers: Record<string, string> = { "Content-Type": "application/json" }
    ) { }

    private buildUrl(path: string, params?: Record<string, any>) {
        const url = new URL(`${this.baseUrl}${path}`);
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
            });
        }
        return url.toString();
    }

    private async handleResponse<T>(response: Response, context: string): Promise<T> {
        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`HTTP ${response.status} on ${context}: ${errorText}`);
        }
        return response.json() as Promise<T>;
    }

    private async request<T>(
        path: string,
        options: RequestInit = {},
        params?: Record<string, any>
    ): Promise<T> {
        const url = this.buildUrl(path, params);
        const response = await fetch(url, {
            headers: this.headers,
            ...options,
        });
        return this.handleResponse<T>(response, path);
    }

    get<T>(path: string, params?: Record<string, any>) {
        return this.request<T>(path, { method: "GET" }, params);
    }

    post<T>(path: string, body: any) {
        return this.request<T>(path, { method: "POST", body: JSON.stringify(body) });
    }
}

export default HttpClient