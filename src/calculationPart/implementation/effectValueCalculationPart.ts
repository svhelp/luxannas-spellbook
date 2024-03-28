import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
