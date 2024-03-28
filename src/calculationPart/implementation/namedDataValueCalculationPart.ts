import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const namedDataValueCalculationPart = (inputData: NamedDataValueCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
