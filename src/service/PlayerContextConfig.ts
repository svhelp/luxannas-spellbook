import { DataFetcherConfig } from "./dataFetcher/DataFetcherConfig";

export type PlayerContextConfig = DataFetcherConfig & {
    championName: string
}