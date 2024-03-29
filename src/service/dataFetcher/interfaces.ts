import { ChampionData } from "domain/ChampionData";

export interface DataFetcher {
    fetchChampionData: (name: string) => ChampionData
}
