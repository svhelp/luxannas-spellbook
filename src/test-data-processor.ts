import { ChampionData } from 'domain/ChampionData'
import fs from 'fs'
import { localDataFetcher } from './service/dataFetcher/localDataFetcher'
import fnv from 'fnv-plus'
import XXH from 'xxhashjs'
import * as dianaData from './test-data/champions/diana/diana.bin.json'
import { playerContext } from './service/playerContext'
import { FormulaPartItem } from 'domain/jsonSchema/FormulaPartItem'

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

const fields: string[] = []

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
            const context = playerContext(champDir, true)
    
            const stats = context.getStats()
            const resourceType = stats.resourceType?.toString() ?? "none"
    
            if (!Object.keys(resourceTypes).includes(resourceType)) {
                resourceTypes[resourceType] = []
            }
    
            resourceTypes[resourceType].push(champDir)
    
            if (champDir == "masteryi") {
                const initStats = context.getStats()
    
                context.setLevel(2)
                context.setSpellLevels([1, 1, 1, 1, 1])
                context.setStats({
                    maxHealth: 650,
                    abilityPower: 0,
                    attackDamage: 70,
                    attackSpeed: initStats.attackSpeed + 0.113
                })
    
                // console.log(initStats)
                // console.log(context.getStats())
    
                context.getSpells()
            }
        }
        catch (e) {
            console.log(`*** ERROR PROCESSING ${champDir} data`)

            throw e
        }

        const championData = localDataFetcher.fetchChampionData(champDir)

        processFile(championData)
    }

    console.log(fields)
}

export const processDianaSpell = () => {
    const level = 5
    const bonusHP = 0
    const MP = 18

    const data = dianaData

    const skillData = data["Characters/Diana/Spells/DianaOrbsAbility/DianaOrbs"]

    const dataValues = skillData["mSpell"]["mDataValues"].map(dataValue => ({
        name: dataValue.mName,
        value: dataValue.mValues[level]
    }))

    console.log("Data values")
    for (const dataValue of dataValues){
        console.log(`${dataValue.name}: ${dataValue.value}`)
    }
    console.log("\n")

    const calculationsData = skillData["mSpell"]["mSpellCalculations"]
    const calculationNames = Object.keys(calculationsData)
    const spellCalculations: {
        name: string
        formula:number[]
        value: number
    }[] = []

    for (const calcName of calculationNames) {
        const result = {
            name: calcName,
            formula: [] as number[],
            value: 0
        }

        const calculationData = calculationsData[calcName as keyof typeof calculationsData]
        const calculationType = calculationData["__type"]

        if (calculationType === "GameCalculation") {
            if (!("mFormulaParts" in calculationData)) {
                continue
            }

            const formulaParts = calculationData["mFormulaParts"]
        
            for (const formulaPart of formulaParts) {
                if (formulaPart["__type"] === "NamedDataValueCalculationPart") {
                    const dataValue = dataValues.find(x => x.name === formulaPart.mDataValue)
                    
                    result.formula.push(dataValue.value)
                    result.value += dataValue.value
                }
        
                if (formulaPart["__type"] === "StatByNamedDataValueCalculationPart") {
                    const dataValue = dataValues.find(x => x.name === formulaPart.mDataValue)
                
                    result.formula.push(dataValue.value)

                    let statValue = 0
                    const statId = "mStat" in formulaPart
                        ? formulaPart.mStat
                        : 0

                    switch (statId) {
                        case 0: {
                            statValue = MP;
                            break;
                        }
                        case 11: {
                            statValue = bonusHP;
                            break;
                        }
                    }
                    
                    result.value += dataValue.value * statValue
                }
            }
        }

        if (calculationType === "GameCalculationModified") {
            if (!("mMultiplier" in calculationData) || !("mModifiedGameCalculation" in calculationData)) {
                continue
            }

            const modifiedData = spellCalculations.find(x => x.name === calculationData.mModifiedGameCalculation)
            
            result.formula = modifiedData.formula.map(x => x * calculationData.mMultiplier.mNumber)
            result.value = modifiedData.value * calculationData.mMultiplier.mNumber
        }

        spellCalculations.push(result)
    }

    console.log("Spell calculations")
    for (const spellCalculation of spellCalculations){
        console.log(`${spellCalculation.name}: ${spellCalculation.value} (${spellCalculation.formula.join(" + ")})`)
    }
}
