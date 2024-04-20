import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { calculateValueByParts } from "../calculationPart/implementation/utils";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { multiplyItems } from "../calculationPart/implementation/utils/multiplyItems";

const defaultMultiplier: NumberCalculationPart = {
    __type: "NumberCalculationPart",
    mNumber: 1
}

export const gameCalculation = (spell: Spell, calculationData: GameCalculation, championName: string) => {
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
