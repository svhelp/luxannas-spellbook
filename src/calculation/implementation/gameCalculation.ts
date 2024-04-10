import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculation = (spell: Spell, calculationData: GameCalculation, championName: string) => {
    const parts = calculationData.mFormulaParts.map(x => parseCalculationPart(spell, x, championName))
    
    return {
        type: "GameCalculation",
        getValue: (context: CalculationContext) => {
            return parts.reduce((acc, item) => acc + item.getValue(context), 0)
        },
        getString: (context: CalculationContext) => {
            return parts.map(item => item.getString(context)).join(" + ")
        },
        getItems: (context: CalculationContext) => {
            let items: CalculationPart[] = []

            for (const part of parts) {
                const partItems = part.getItems(context)

                items = items.concat(partItems)
            }

            return items
        },
    };
}
