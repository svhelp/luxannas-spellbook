import { CalculationContext } from "./CalculationContext";

export interface CalculationPart {
    getValue: (context: CalculationContext) => number
    getString: (context: CalculationContext) => string
}
