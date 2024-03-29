import { localDataFetcher } from "./dataFetcher/localDataFetcher"

export const playerContext = (name: string, isLocal?: boolean) => {

    const init = () => {
        if (!isLocal) {
            throw new Error("Currently only local data source is supported.")
        }

        const championData = localDataFetcher.fetchChampionData(name)
    }

    init()

    return {

    }
}
