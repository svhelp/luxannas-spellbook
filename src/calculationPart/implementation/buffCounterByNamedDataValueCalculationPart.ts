import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const buffCounterByNamedDataValueCalculationPart = (inputData: BuffCounterByNamedDataValueCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
