import { CalculationContext } from "./CalculationContext";

export interface CalculationPart {
    type: string
    getValue: (context: CalculationContext) => number
    getString: (context: CalculationContext) => string
}
