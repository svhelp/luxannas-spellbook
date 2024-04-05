import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const spellCalculation = (spell: Spell, calculationData: GameCalculation) => {
    const parts = calculationData.mFormulaParts.map(x => parseCalculationPart(spell, x))
    
    return {
        getValue: (context: CalculationContext) => {
            return parts.reduce((acc, item) => acc + item.getValue(context), 0)
        },
        getString: (context: CalculationContext) => {
            return parts.map(item => item.getString(context)).join()
        }
    };
}
