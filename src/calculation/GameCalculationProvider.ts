import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext"
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart"

export type CalculationProvider = GameCalculationProvider | ModifiedGameCalculationProvider | ConditionalGameCalculationProvider

export interface GameCalculationProvider {
    type: "GameCalculation"
    getItems: (context: CalculationContext) => CalculationPart[]
}

export interface ModifiedGameCalculationProvider {
    type: "GameCalculationModified"
    getItems: (context: CalculationContext) => CalculationPart[]
}

export interface ConditionalGameCalculationProvider {
    type: "GameCalculationConditional"
    getItems: (context: CalculationContext) => CalculationPart[]
}
