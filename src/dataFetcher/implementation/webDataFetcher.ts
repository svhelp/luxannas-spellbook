import https from 'https'

import { DataFetcher } from "./DataFetcher"
import { parseChampionData } from '../../parsers'
import { DataFetcherConfig } from '../DataFetcherConfig'

const defaultBaseUrl = 'https://raw.communitydragon.org/latest/game/data/characters'

export const webDataFetcher = (config: DataFetcherConfig): DataFetcher => {
    const baseUrl = config.customUri ?? defaultBaseUrl

    return {
        type: "WebDataFetcher",
        fetchChampionData: async (name: string) => {
            const expectedFileName = `${name}.bin.json`
            const filePath = `${baseUrl}/${name}/${expectedFileName}`

            return new Promise((resolve, reject) => {
                const request = https.get(filePath, (res) => {
                    res.setEncoding('utf8');
                    
                    let responseBody = '';

                    res.on('data', (chunk) => {
                        responseBody += chunk;
                    });
        
                    res.on('end', () => {
                        if (res.statusCode !== 200) {
                            reject("Error loading champion data.");
                            return
                        }

                        let fileObject = undefined

                        try {
                            fileObject = JSON.parse(responseBody)
                        } catch (e) {
                            reject(`Error parsing champion data (${filePath}).`)
                        }
        
                        resolve(parseChampionData(fileObject))
                    });
                })

                request.on('error', (err) => {
                    reject("Unexpected network error while loading champion data.");
                });
            })
        }
    }
}
