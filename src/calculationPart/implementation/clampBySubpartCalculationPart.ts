import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const clampBySubpartCalculationPart = (inputData: ClampBySubpartCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
