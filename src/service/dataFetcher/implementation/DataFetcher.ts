import { ChampionData } from "domain/ChampionData";

export interface DataFetcher {
    type: string
    fetchChampionData: (name: string) => Promise<ChampionData>
}
