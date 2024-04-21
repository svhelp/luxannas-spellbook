import { SpellCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { gameCalculation } from "./implementation/gameCalculation";
import { gameCalculationModified } from "./implementation/gameCalculationModified";
import { gameCalculationConditional } from "./implementation/gameCalculationConditional";
import { CalculationProvider } from "./GameCalculationProvider";

export const calculationFactory = (spell: Spell, calculationData: SpellCalculation, championName: string): CalculationProvider => {
    const calculationType = calculationData.__type

    switch(calculationType) {
        case "GameCalculation":
            return gameCalculation(spell, calculationData, championName)
        case "GameCalculationModified":
            return gameCalculationModified(spell, calculationData, championName)
        case "GameCalculationConditional":
            return gameCalculationConditional(spell, calculationData, championName)
        default: {
            console.log(calculationData)

            throw new Error(`Unknown calculation type: ${calculationType}`)
        }
    }
}