import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { GameCalculationModified } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { ModifiedGameCalculationProvider } from "../GameCalculationProvider";
import { parseCalculationPart } from "calculation/calculationPart";
import { calculateValueByParts, multiplyItems } from "calculation/calculationPart/implementation/utils";

const defaultMultiplier: NumberCalculationPart = {
    __type: "NumberCalculationPart",
    mNumber: 1
}

export const gameCalculationModified = (spell: Spell, calculationData: GameCalculationModified, championName: string): ModifiedGameCalculationProvider => {
    const modifiedCalculationName = calculationData.mModifiedGameCalculation
    const multiplierPart = parseCalculationPart(
        spell,
        calculationData.mMultiplier ?? defaultMultiplier,
        championName
    )
    
    return {
        type: "GameCalculationModified",
        getItems: (context: CalculationContext, plainResults: { name: string, items: CalculationPart[] }[]) => {
            const modifiedCalculationData = plainResults.find(r => r.name === modifiedCalculationName)

            if (!modifiedCalculationData) {
                throw new Error("Calculation to modify not found")
            }

            const items = modifiedCalculationData.items
            const multiplierItems = multiplierPart.getItems(context)
            const multiplier = multiplierItems.length === 0 ? 1 : calculateValueByParts(context, multiplierItems)

            return multiplyItems(items, multiplier)
        }
    };
}
