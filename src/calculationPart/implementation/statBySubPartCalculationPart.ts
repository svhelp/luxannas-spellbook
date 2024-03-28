import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const statBySubPartCalculationPart = (inputData: StatBySubPartCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
