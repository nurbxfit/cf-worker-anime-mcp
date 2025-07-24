class HttpClient {
    constructor(protected baseUrl: string, protected headers = {
        'Content-Type': 'application/json',
    }) {

    }

    async get<ResponseType>(path: string) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'GET',
            headers: this.headers
        });
        return handleResponse<ResponseType>(response, path);
    }

    async post<ResponseType>(path: string, body: any) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        });

        return handleResponse<ResponseType>(response, path);
    }
}

export const handleResponse = async <T>(response: Response, context: string) => {
    if (!response.ok) {
        throw new Error(`Failed to fetch ${context}`)
    }
    return response.json() as T;
}


export default HttpClient;