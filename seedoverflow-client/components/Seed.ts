import { API_URL } from "../pages/_app";

export interface Seed {
    seed: string,
    submitted_by?: string,
    seed_creation_date?: Date,
    submitted_by_username: string
}

export interface NewSeedDto {
    seed: string
}

export interface SeedStore {
    seeds: Seed[],
    seedStoreUpdateTime?: Date,
    updateSeeds(seeds: Seed[]): any,
}

export const GetSeedsPromise = async (token: string) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const url = `${API_URL}/seeds`
    return fetch(url, requestOptions);
}

export const PostSeedPromise = async (token: string, seed: NewSeedDto) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(seed)
    }
    const url = `${API_URL}/seed`
    return fetch(url, requestOptions);
}

export const DeleteSeedPromise = async (token: string, seedId: string) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const url = `${API_URL}/seed/${seedId}`
    return fetch(url, requestOptions);
}

export const GetSeedPromise = async (seedId: string) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `${API_URL}/seed/${seedId}`
    return fetch(url, requestOptions);
}