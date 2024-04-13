import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { calculateValueByParts, inferFormulaByParts } from "../calculationPart/implementation/utils";

export const gameCalculation = (spell: Spell, calculationData: GameCalculation, championName: string) => {
    const parts = calculationData.mFormulaParts.map(x => parseCalculationPart(spell, x, championName))
    
    return {
        type: "GameCalculation",
        getItems: (context: CalculationContext) => {
            const items = parts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])
            const value = calculateValueByParts(context, items)
            const formula = inferFormulaByParts(context, items)

            return {
                value,
                formula
            }
        },
    };
}
