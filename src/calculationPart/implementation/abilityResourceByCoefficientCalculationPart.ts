import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const abilityResourceByCoefficientCalculationPart = (inputData: AbilityResourceByCoefficientCalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => {
            throw new Error("Not implemented")
        },
        getString: (context: CalculationContext) => {
            throw new Error("Not implemented")
        }
    };
};
