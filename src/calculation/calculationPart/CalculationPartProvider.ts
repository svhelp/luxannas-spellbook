import { CalculationContext } from "./implementation/CalculationContext";
import { CalculationPart } from "./implementation/CalculationPart";

export interface CalculationPartProvider {
    type: string
    getItems: (context: CalculationContext) => CalculationPart[]
}
