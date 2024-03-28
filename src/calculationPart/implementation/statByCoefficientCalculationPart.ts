import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
