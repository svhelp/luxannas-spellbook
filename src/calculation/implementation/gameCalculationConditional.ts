import { CalculationContext } from "domain/CalculationContext";
import { GameCalculationConditional } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculationConditional = (spell: Spell, calculationData: GameCalculationConditional) => {
    
    return {
        type: "GameCalculationConditional",
        getItems: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        }
    };
}
