import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faHouseDamage, faMountain, faSun, faWater } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../pages/_app";

export interface Seed {
    seed: string,
    submitted_by: string,
    seed_creation_date: Date,
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

export enum SeedTagEnum {
    Flat = "Flat",
    Mountain = "Mountain",
    Desert = "Desert",
    Ocean = "Ocean",
    Stronghold = "Stronghold",
    Village = "Village",
    Mineshaft = "Mineshaft",
    PillagerOutpost = "Pillager Outpost",
    DesertPyramid = "Desert Pyramid",
    WoodlandMansion = "Woodland Mansion",
    Shipwreck = "Shipwreck",
    VillageBlacksmith = "Village Blacksmith",
    Igloo = "Igloo",
    MushroomIsland = "Mushroom Island",
    OceanMonument = "Ocean Monument",
    Jungle = "Jungle",
    BambooForest = "BambooForest",
    Meadow = "Meadow",
    Flowers = "Flowers",
    Badlands = "Badlands",
    Snow = "Snow",
    Swamp = "Swamp",
    Ravine = "Ravine",
    JavaEdition = "Java Edition",
    BedrockEdition = "Bedrock Edition",
    MobSpawner = "Mob Spawner",
    Savanna = "Savanna",
    Taiga = "Taiga",
    OverrunVillage = "Overrun Village",
    CoralReef = "Coral Reef",
    JungleTemple = "Jungle Temple",
    WitchHut = "Witch Hut",
    LargeCave = "Large Cave",
    SurfaceCave = "Surface Cave",
    LushCave = "Lush Cave",
    LonelyIsland = "Lonely Island",
    Mesa = "Mesa",
    IceSpikes = "Ice Spikes",
    Icebergs = "Icebergs",
    ExtremeHill = "Extreme Hill",
    Fossil = "Fossil",
    Forest = "Forest",
    AncientCity = "Ancient City"
}

export interface SeedTag {
    tag: SeedTagEnum,
    icon: IconDefinition | undefined,
    bgColor: string
}

export const getSeedTagEnumColor = (seedTagEnum: SeedTagEnum) : string => {
    switch (seedTagEnum) {
        case SeedTagEnum.Desert:
            return 'bg-tan'
        case SeedTagEnum.Flat:
            return 'bg-light'
        case SeedTagEnum.Ocean:
            return 'bg-blue'
        case SeedTagEnum.Mountain:
            return 'bg-darker-green'
        default:
            return 'bg-turquoise'
    }
}

export const getSeedTagEnumIcon = (seedTagEnum : SeedTagEnum) : IconDefinition | undefined => {
    switch (seedTagEnum) {
        case SeedTagEnum.Mountain:
            return faMountain;
        case SeedTagEnum.Flat:
            return undefined;
        case SeedTagEnum.Desert:
            return faSun;
        case SeedTagEnum.Ocean:
            return faWater
        case SeedTagEnum.Stronghold:
            return faHouseDamage
        default:
            return faCoffee;
    }
}

export const createSeedTag = (seedTagEnum: SeedTagEnum) : SeedTag => {
    let newSeedTag : SeedTag = {
        tag: seedTagEnum,
        bgColor: getSeedTagEnumColor(seedTagEnum),
        icon: getSeedTagEnumIcon(seedTagEnum)
    }
    return newSeedTag
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

export const GetRecentSeeds = async (index: number = 1) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `${API_URL}/recentseeds/${index}`
    return fetch(url, requestOptions)
}

export const DeleteAllSeeds = async (userAccessToken: string) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userAccessToken}`
        }
    }
    const url = `${API_URL}/seeds`
    return fetch(url, requestOptions)
}