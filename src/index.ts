import { processTestData } from './test-data-processor'
import * as data from './test-data/champions/diana/diana.bin.json'

const level = 5
const bonusHP = 0
const MP = 18

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

processTestData()
