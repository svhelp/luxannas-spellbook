import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { SumOfSubPartsCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const sumOfSubPartsCalculationPart = (inputData: SumOfSubPartsCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
