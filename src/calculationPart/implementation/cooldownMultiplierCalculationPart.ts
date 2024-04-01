import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CooldownMultiplierCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const cooldownMultiplierCalculationPart = (inputData: CooldownMultiplierCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => 1, // to implement
        getString: (context: CalculationContext) => ""
    };
}