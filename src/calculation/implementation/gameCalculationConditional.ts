import { CalculationContext } from "domain/CalculationContext";
import { GameCalculationConditional } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculationConditional = (spell: Spell, calculationData: GameCalculationConditional) => {
    
    return {
        type: "GameCalculationConditional",
        getValue: (context: CalculationContext) => {
            //return parts.reduce((acc, item) => acc + item.getValue(context), 0)

            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        }
    };
}
