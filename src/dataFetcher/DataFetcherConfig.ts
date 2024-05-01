export enum DataSource {
    Web,
    Local,
}

export type DataFetcherConfig = {
    source?: DataSource
    customUri?: string
}
