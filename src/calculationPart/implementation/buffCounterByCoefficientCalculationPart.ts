import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const buffCounterByCoefficientCalculationPart = (inputData: BuffCounterByCoefficientCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
