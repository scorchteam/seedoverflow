import { API_URL } from "../pages/_app";

export interface Seed {
    seed: string,
    submitted_by: string
}

export const GetSeedsPromise = async (token: string) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
    const url = `${API_URL}/seeds`
    return fetch(url, requestOptions);
}