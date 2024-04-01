import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { SpellCalculation } from "domain/jsonSchema/SpellData";

export const spellCalculation = (calculationData: SpellCalculation) => {
    const parts = calculationData.mFormulaParts.map(parseCalculationPart)
    
    return {
        getValue: (context: CalculationContext) => {
            return parts.reduce((acc, item) => acc + item.getValue(context), 0)
        },
        getString: (context: CalculationContext) => {
            return parts.map(item => item.getString(context)).join()
        }
    };
}
