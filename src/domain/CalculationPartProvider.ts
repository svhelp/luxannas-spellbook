import { CalculationContext } from "./CalculationContext";
import { CalculationPart } from "./CalculationPart";

export interface CalculationPartProvider {
    type: string
    getValue: (context: CalculationContext) => number
    getString: (context: CalculationContext) => string
    getItems: (context: CalculationContext) => CalculationPart[]
}
