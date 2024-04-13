import { CalculationContext } from "domain/CalculationContext";
import { GameCalculationModified } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculationModified = (spell: Spell, calculationData: GameCalculationModified) => {
    
    return {
        type: "GameCalculationModified",
        getItems: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        }
    };
}
