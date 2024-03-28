import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelFormulaCalculationPart = (inputData: ByCharLevelInterpolationCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
