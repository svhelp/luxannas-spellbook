import fs from 'fs'

import { DataFetcher } from "./interfaces"
import { parseChampionData } from './parsers/parseChampionData'

const basePath = 'src/test-data/champions'

const fetchChampionData = (name: string) => {
    const expectedFileName = `${name}.bin.json`
    const filePath = `${basePath}\\${name}\\${expectedFileName}`

    if (!fs.existsSync(filePath)) {
        throw new Error(`Champion data not found for ${name}`)
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const fileObject = JSON.parse(fileContent)

    return parseChampionData(fileObject)
}

export const localDataFetcher: DataFetcher = {
    fetchChampionData
}
