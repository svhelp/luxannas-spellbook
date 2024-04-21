import fs from 'fs'

import { DataFetcher } from "./interfaces"
import { parseChampionData } from './parsers/parseChampionData'

const defaultBasePath = 'src/test-data/champions'

const fetchChampionData = (name: string, path?: string) => {
    const basePath = path ?? defaultBasePath
    const expectedFileName = `${name}.bin.json`
    const filePath = `${basePath}/${name}/${expectedFileName}`

    if (!fs.existsSync(filePath)) {
        throw new Error(`Champion data not found for ${name} (${filePath})`)
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const fileObject = JSON.parse(fileContent)

    return parseChampionData(fileObject)
}

export const localDataFetcher: DataFetcher = {
    fetchChampionData
}
