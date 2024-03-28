import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelBreakpointsCalculationPart = (inputData: ByCharLevelBreakpointsCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
