import type {IJsonTransformable} from "../models/IJsonTransformable.ts";

/**
 * Basic HTTP Client
 */
export class HttpClient {
    private readonly BaseUrl : string = "http://localhost:8080/api/v1";

    /**
     * Base URL with trailing slash
     */
    public get BaseUrlWithSlash() : string {
        return this.BaseUrl + "/";
    }

    /**
     * @param baseUrl Base URL of the API
     */
    constructor(baseUrl : string) {
        this.BaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    }

    /**
     * GET request
     * @param endpoint
     *
     * @returns {Promise<Response>}
     */
    public async getAsync(endpoint : string) : Promise<Response> {
        return await fetch(this.BaseUrlWithSlash + endpoint);
    }
    
    /**
     * POST request
     * @param endpoint
     * @param body
     * 
     * @returns {Promise<Response>}
     */
    public async postAsync(endpoint : string, body : IJsonTransformable) : Promise<Response> {
        return await fetch(this.BaseUrlWithSlash + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    /**
     * PUT request
     * @param endpoint
     * @param body
     * 
     * @returns {Promise<Response>}
     */
    public async putAsync(endpoint : string, body : IJsonTransformable) : Promise<Response> {
        return await fetch(this.BaseUrlWithSlash + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
    
    /**
     * DELETE request
     * @param endpoint
     * 
     * @returns {Promise<Response>}
     */
    public async deleteAsync(endpoint : string) : Promise<Response> {
        return await fetch(this.BaseUrlWithSlash + endpoint, {
            method: 'DELETE'
        })
    }
    
    /**
     * PATCH request
     * @param endpoint
     * @param body
     * 
     * @returns {Promise<Response>}
     */
    public async patchAsync(endpoint : string, body : IJsonTransformable) : Promise<Response> {
        return await fetch(this.BaseUrlWithSlash + endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}
