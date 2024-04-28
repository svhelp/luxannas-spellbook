import { DataFetcher } from "./implementation/DataFetcher";
import { DataFetcherConfig, DataSource } from "./DataFetcherConfig";
import { localDataFetcher } from "./implementation/localDataFetcher";
import { webDataFetcher } from "./implementation/webDataFetcher";

export const dataFetcherFactory = (config: DataFetcherConfig): DataFetcher => {
    if (config.source === DataSource.Local) {
        return localDataFetcher(config)
    }

    return webDataFetcher(config)
}
