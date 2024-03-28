import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ProductOfSubPartsCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const productOfSubPartsCalculationPart = (inputData: ProductOfSubPartsCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
