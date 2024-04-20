import { ChampionData } from 'domain/ChampionData'
import fs from 'fs'
import { localDataFetcher } from './service/dataFetcher/localDataFetcher'
import fnv from 'fnv-plus'
import XXH from 'xxhashjs'
import { playerContext } from './service/playerContext'

const basePath = './src/test-data/champions'

const formulaPartType: string[] = []
const resourceTypes: {[key: string]: string[]} = {

}

const itemTypeToLog = "CooldownMultiplierCalculationPart"

const recoursivelyProcessCalcPart = (calculationPart: {[key: string]: any}, types: string[]) => {
    for (const field in calculationPart) {
        const subObject = calculationPart[field]

        if (!subObject) {
            continue
        }

        if (Array.isArray(subObject)) {
            for (const item of subObject) {
                if (typeof item != "object" || !("__type" in item)) {
                    continue
                }

                if (item.__type == itemTypeToLog) {
                    console.log(subObject)
                }

                if (!types.includes(item.__type)) {
                    types.push(item.__type)
                }
        
                recoursivelyProcessCalcPart(item, types)
            }
        } else {
            if (typeof subObject != "object" || !("__type" in subObject)) {
                continue
            }

            if (subObject.__type == itemTypeToLog) {
                console.log(subObject)
            }

            if (!types.includes(subObject.__type)) {
                types.push(subObject.__type)
            }

            recoursivelyProcessCalcPart(subObject, types)
        }
    }
}

const types: string[] = []

const processFile = (data: ChampionData) => {
    const logError = (errorMessage: string) => console.log(`${data.rootChampionData.mCharacterName} ${errorMessage.toUpperCase()}`)

    for (const spellData of data.spellsData) {
        const effectAmount = spellData.mEffectAmount
        const dataValues = spellData.mDataValues
        const spellCalculations = spellData.mSpellCalculations
        
        if (!spellCalculations) {
            continue
        }

        for (const spellCalculationName in spellCalculations) {
            const calculation = spellCalculations[spellCalculationName]

            if (calculation.__type != "GameCalculation" || !calculation.mFormulaParts) {
                continue
            }

            for (const calculationPart of calculation.mFormulaParts) {
                const partType = calculationPart.__type.trim()
                // StatBySubPartCalculationPart
                if (partType == "{803dae4c}") {
                    recoursivelyProcessCalcPart(calculationPart, types)

                    //console.log(calculationPart)
                }

                if (formulaPartType.includes(partType)) {
                    continue
                }

                formulaPartType.push(partType)
                
                // console.log(partType)
            }
        }
    }
}

const testData: string[] = []

export const processTestData = () => {
    const valuesToHash: string[] = [
        // 'PassiveAPRatio', "PassiveBADRatio"
    ]

    for (const valueToHash of valuesToHash) {
        const hash = fnv.hash(valueToHash.toLowerCase(), 32)
        console.log(hash.hex())

        // console.log(XXH.h64(valueToHash, 0x0).toString(16))
        // console.log()
    }

    for (const champDir of fs.readdirSync(basePath)) {

        try {
            const context = playerContext(champDir, testData, true)
    
            const stats = context.getStats()
            const resourceType = stats.resourceType?.toString() ?? "none"
    
            if (!Object.keys(resourceTypes).includes(resourceType)) {
                resourceTypes[resourceType] = []
            }
    
            resourceTypes[resourceType].push(champDir)
    
            //if (champDir == "xayah") {
                const initStats = context.getStats()
    
                context.setLevel(3)
                context.setSpellLevels([1, 1, 1, 1, 1])
                context.setStats({
                    maxHealth: 772,
                    abilityPower: 25,
                    abilityHaste: 15,
                    attackDamage: 86,
                    attackSpeed: initStats.attackSpeed + 0.113,
                    resourceMax: 425,
                    critChance: 0.15
                })
    
                // console.log(initStats)
                // console.log(context.getStats())
    
                context.getSpells()
            //}
        }
        catch (e) {
            console.log(`*** ERROR PROCESSING ${champDir} data`)

            throw e
        }

        const championData = localDataFetcher.fetchChampionData(champDir)

        processFile(championData)
    }

    console.log(testData)
}
