import { CalculationContext } from "./CalculationContext";
import { CalculationPart } from "./CalculationPart";

export interface CalculationPartProvider {
    type: string
    getItems: (context: CalculationContext) => CalculationPart[]
}
