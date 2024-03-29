import fs from 'fs'

import { DataFetcher } from "./interfaces"

const basePath = 'src/test-data/champions'

const fetchChampionData = (name: string) => {
    const champDirs = fs.readdirSync(basePath)

    if (!champDirs.includes(name)) {
        throw new Error(`Champion data not found for ${name}`)
    }
    
    const fileNames = fs.readdirSync(`${basePath}\\${name}`)
    const expectedFileName = `${name}.bin.json`

    if (!fileNames.includes(expectedFileName)) {
        throw new Error(`Champion data not found for ${name}`)
    }
    
    const filePath = `${basePath}\\${name}\\${expectedFileName}`
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const fileObject = JSON.parse(fileContent)

    return fileObject
}

export const localDataFetcher: DataFetcher = {
    fetchChampionData
}
