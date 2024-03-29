import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelFormulaCalculationPart = (inputData: ByCharLevelFormulaCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
