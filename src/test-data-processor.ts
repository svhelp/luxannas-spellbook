import { RootChampionData } from 'domain/jsonSchema/RootChampionData'
import { SpellData } from 'domain/jsonSchema/SpellData'
import fs from 'fs'
import XXH from 'xxhashjs'

const basePath = './src/test-data/champions'

const formulaPartType: string[] = []

const processFile = (path: string, data: {[key: string]: any}) => {
    const logError = (errorMessage: string) => console.log(`${path} ${errorMessage.toUpperCase()}`)

    const rootChampionDataKey = Object.keys(data).find(key => /Characters\/\w+\/CharacterRecords\/Root/.test(key))

    if (!rootChampionDataKey) {
        logError("root champion data not found")
        return
    }

    const rootChampionData: RootChampionData = data[rootChampionDataKey]
    const passiveSpellKey = rootChampionData.mCharacterPassiveSpell
    const passiveSpellData = data[passiveSpellKey]
    const spellsData: SpellData[] = rootChampionData.spellNames.map((spellName: string) => {
        const keyRegex = new RegExp(`Characters/\\w+/Spells/${spellName}$`)
        const spellDataKeys = Object.keys(data).filter(key => keyRegex.test(key))

        if (spellDataKeys.length !== 1) {
            logError(`${keyRegex} spell key extraction error`)
        }

        return data[spellDataKeys[0]]
    })

    for (const spellData of spellsData) {
        const effectAmount = spellData.mSpell.mEffectAmount
        const dataValues = spellData.mSpell.mDataValues
        const spellCalculations = spellData.mSpell.mSpellCalculations
        
        if (!spellCalculations) {
            continue
        }

        for (const spellCalculationName in spellCalculations) {
            if (!spellCalculations[spellCalculationName].mFormulaParts) {
                continue
            }

            for (const calculationPart of spellCalculations[spellCalculationName].mFormulaParts) {
                const partType = calculationPart.__type.trim()

                if (formulaPartType.includes(partType)) {
                    continue
                }

                formulaPartType.push(partType)
                console.log(partType)
            }
        }
    }

}

export const processTestData = () => {
    console.log(XXH.h64('ClampBySubpartCalculationPart'.toLowerCase(), 0x0000).toString(16))

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
