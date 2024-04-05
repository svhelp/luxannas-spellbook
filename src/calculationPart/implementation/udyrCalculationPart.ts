import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";

export const udyrCalculationPart = (): CalculationPart => {
    
    return {
        type: "UdyrCalculationPart",
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
}