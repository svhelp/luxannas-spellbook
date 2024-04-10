import { CalculationContext } from "domain/CalculationContext";
import { GameCalculationModified } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculationModified = (spell: Spell, calculationData: GameCalculationModified) => {
    
    return {
        type: "GameCalculationModified",
        getValue: (context: CalculationContext) => {
            //return parts.reduce((acc, item) => acc + item.getValue(context), 0)

            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        },
        getItems: (context: CalculationContext) => {
            //eturn parts.map(item => item.getString(context)).join()

            throw new Error("Not implemented")
        }
    };
}
