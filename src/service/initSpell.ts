import { Spell } from "domain/jsonSchema/SpellData"
import { CalculationProviderContainer } from "../calculation/spellCalculator/CalculationProviderContainer"
import { CalculationProvider } from "calculation/gameCalculation/GameCalculationProvider"
import { gameCalculationFactory } from "calculation/gameCalculation"

export const initSpell = (spellData: Spell, name: string, testData?: string[]) => {
    const spellName = spellData.mClientData.mTooltipData.mObjectName

    const calculations: CalculationProviderContainer<CalculationProvider>[] = []

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

        const calculation = gameCalculationFactory(spellData, calculationData, name)

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
