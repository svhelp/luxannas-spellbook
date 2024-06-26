import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { parseCalculationPart } from "calculation/calculationPart";
import { GameCalculationProvider } from "../GameCalculationProvider";
import { calculateValueByParts, multiplyItems } from "calculation/calculationPart/implementation/utils";

const defaultMultiplier: NumberCalculationPart = {
    __type: "NumberCalculationPart",
    mNumber: 1
}

export const gameCalculation = (spell: Spell, calculationData: GameCalculation, championName: string): GameCalculationProvider => {
    const parts = calculationData.mFormulaParts.map(x => parseCalculationPart(spell, x, championName))
    const multiplierPart = parseCalculationPart(
        spell,
        calculationData.mMultiplier ?? defaultMultiplier,
        championName
    )
    
    return {
        type: "GameCalculation",
        getItems: (context: CalculationContext) => {
            const items = parts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])
            const multiplierItems = multiplierPart.getItems(context)
            const multiplier = multiplierItems.length === 0 ? 1 : calculateValueByParts(context, multiplierItems)

            return multiplyItems(items, multiplier)
        },
    };
}
