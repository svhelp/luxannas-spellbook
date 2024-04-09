import { CalculationContext } from "./CalculationContext";

export interface CalculationPartProvider {
    type: string
    getValue: (context: CalculationContext) => number
    getString: (context: CalculationContext) => string
}
