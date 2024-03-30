import { ChampionData } from 'domain/ChampionData'
import fs from 'fs'
import { localDataFetcher } from './service/dataFetcher/localDataFetcher'
import XXH from 'xxhashjs'
import * as dianaData from './test-data/champions/diana/diana.bin.json'
import { playerContext } from './service/playerContext'

const basePath = './src/test-data/champions'

const formulaPartType: string[] = []
const resourceTypes: {[key: string]: string[]} = {

}

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
            if (!spellCalculations[spellCalculationName].mFormulaParts) {
                continue
            }

            for (const calculationPart of spellCalculations[spellCalculationName].mFormulaParts) {
                const partType = calculationPart.__type.trim()

                if (partType == "BuffCounterByCoefficientCalculationPart") {
                    //console.log(spellData)
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

export const processTestData = () => {
    console.log(XXH.h64('ClampBySubpartCalculationPart'.toLowerCase(), 0x0000).toString(16))

    for (const champDir of fs.readdirSync(basePath)) {
        const context = playerContext(champDir, true)

        const stats = context.getStats()
        const resourceType = stats.resourceType?.toString() ?? "none"

        if (!Object.keys(resourceTypes).includes(resourceType)) {
            resourceTypes[resourceType] = []
        }

        resourceTypes[resourceType].push(champDir)

        if (champDir == "diana") {
            context.setSpellLevels([0, 1, 0, 0, 0])
            context.setStats({
                abilityPower: 18
            })
        }
        //console.log(context.getStats())

        const championData = localDataFetcher.fetchChampionData(champDir)

        processFile(championData)
    }

    //console.log(resourceTypes)
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
