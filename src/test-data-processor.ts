import fs from 'fs'

const basePath = './src/test-data/champions'

const processFile = (path: string, data: {[key: string]: any}) => {
    const skillsRefKey = Object.keys(data).find(key => /Characters\/\w+\/CharacterRecords\/Root/.test(key))

    if (!skillsRefKey || !('spellNames' in data[skillsRefKey]) || !Array.isArray(data[skillsRefKey].spellNames)) {
        console.log(`${path} SKILLS DATA NOT FOUND`)
        return
    }

    if (data[skillsRefKey].spellNames.length !== 4) {
        console.log(`${path} has less than 4 skills`)
    }

}

export const processTestData = () => {
    for (const champDir of fs.readdirSync(basePath)) {
        const fileNames = fs.readdirSync(`${basePath}\\${champDir}`)

        if (fileNames.length !== 1) {
            continue
        }

        const filePath = `${basePath}\\${champDir}\\${fileNames[0]}`
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const fileObject = JSON.parse(fileContent)

        processFile(filePath, fileObject)
    }
}
