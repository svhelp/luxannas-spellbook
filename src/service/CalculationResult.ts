import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart"

export type CalculationResult = {
    name: string
    items: CalculationPart[]
    altItems?: CalculationPart[]
}
