import {HttpClient} from "./HttpClient";

let httpClientStatic : HttpClient | undefined;
export const createClient = (baseUrl : string) => {
    if (httpClientStatic) {
        throw new Error("HttpClient already initialized");
    }
    httpClientStatic = new HttpClient(baseUrl);
    return httpClientStatic;
}

export const useClient = () => {
    if (!httpClientStatic) {
        throw new Error("HttpClient not initialized");
    }
    return httpClientStatic;
}