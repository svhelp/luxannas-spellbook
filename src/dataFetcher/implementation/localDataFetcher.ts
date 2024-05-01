import fs from 'fs'

import { DataFetcher } from "./DataFetcher"
import { DataFetcherConfig } from '../DataFetcherConfig'
import { parseChampionData } from 'parsers'

const defaultBasePath = 'src/test-data/champions'

export const localDataFetcher = (config: DataFetcherConfig): DataFetcher => {
    const basePath = config.customUri ?? defaultBasePath

    return {
        type: "LocalDataFetcher",
        fetchChampionData: async (name: string) => {
            const expectedFileName = `${name}.bin.json`
            const filePath = `${basePath}/${name}/${expectedFileName}`

            return new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        reject(`Error loading champion data (${filePath}).`)
                    }

                    let fileObject = undefined

                    try {
                        fileObject = JSON.parse(data)
                    } catch (e) {
                        reject(`Error parsing champion data (${filePath}).`)
                    }
                    
                    resolve(parseChampionData(fileObject))
                })
            })
        }
    }
}
