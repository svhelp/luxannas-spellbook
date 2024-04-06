import { CalculationPart } from "domain/CalculationPart";
import { SpellCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { gameCalculation } from "./implementation/gameCalculation";
import { gameCalculationModified } from "./implementation/gameCalculationModified";
import { gameCalculationConditional } from "./implementation/gameCalculationConditional";

export const calculationFactory = (spell: Spell, calculationData: SpellCalculation): CalculationPart => {
    const calculationType = calculationData.__type

    switch(calculationType) {
        case "GameCalculation":
            return gameCalculation(spell, calculationData)
        case "GameCalculationModified":
            return gameCalculationModified(spell, calculationData)
        case "GameCalculationConditional":
            return gameCalculationConditional(spell, calculationData)
        default: {
            console.log(calculationData)

            throw new Error(`Unknown calculation type: ${calculationType}`)
        }
    }
}