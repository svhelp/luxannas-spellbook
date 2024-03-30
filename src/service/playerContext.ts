import { localDataFetcher } from "./dataFetcher/localDataFetcher"

export const playerContext = (name: string, isLocal?: boolean) => {
    if (!isLocal) {
        throw new Error("Currently only local data source is supported.")
    }

    const championData = localDataFetcher.fetchChampionData(name)

    const runes = [

    ]

    let level = 1
    let spellLevels = [ 0, 0, 0, 0, 0 ]

    let items = [

    ]

    return {

    }
}
