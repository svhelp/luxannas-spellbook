import { ConditionalGameCalculationProvider } from "calculation/GameCalculationProvider";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { GameCalculationConditional } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculationConditional = (spell: Spell, calculationData: GameCalculationConditional): ConditionalGameCalculationProvider => {
    
    return {
        type: "GameCalculationConditional",
        getItems: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        }
    };
}
