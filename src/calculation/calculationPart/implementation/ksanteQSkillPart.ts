import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";

export const ksanteQSkillPart = (): CalculationPart => {
    
    return {
        type: "KsanteQSkillPart",
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
}