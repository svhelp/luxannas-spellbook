import { Spell } from "domain/jsonSchema/SpellData"
import { calculationFactory } from "../calculation"

export const initSpell = (spellData: Spell, name: string, testData: string[]) => {
    const spellName = spellData.mClientData.mTooltipData.mObjectName

    const calculations = []

    for (const calculationName in spellData.mSpellCalculations) {
        const calculationData = spellData.mSpellCalculations[calculationName]

        // if ("GameCalculationConditional" === calculationData.__type) {
        //     if ('{c0482365}' in calculationData) {
        //         console.log(name)
        //         console.log(spellName)
        //         console.log(calculationName)
        //         console.log(calculationData)
        //         console.log(calculationData["{c0482365}"])
        //     }

        //     for (const field of Object.keys(calculationData)) {
        //         if (testData.includes(field)) {
        //             continue
        //         }

        //         testData.push(field)
        //     }
        // }

        const calculation = calculationFactory(spellData, calculationData, name)

        calculations.push({
            name: calculationName,
            calculation
        })
    }

    return {
        name: spellName,
        calculations
    };
}
