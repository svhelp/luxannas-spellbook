import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CooldownMultiplierCalculationPart } from "domain/jsonSchema/FormulaPartItem";

// the part is used only for gameplay
export const cooldownMultiplierCalculationPart = (inputData: CooldownMultiplierCalculationPart): CalculationPart => {
    return {
        type: "CooldownMultiplierCalculationPart",
        getValue: (context: CalculationContext) => 1,
        getString: (context: CalculationContext) => ""
    };
}