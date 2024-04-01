import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";

export const abilityResourceByCoefficientCalculationPart = (inputData: AbilityResourceByCoefficientCalculationPart): CalculationPart => {

    const coefficient = inputData.mCoefficient
    const formula = inputData.mStatFormula

    return {
        getValue: (context: CalculationContext) => {
            return coefficient * getStat(context, "resourceMax", formula)
        },
        getString: (context: CalculationContext) => {
            return `${coefficient * 100}% ${formula} RESOURCE TYPE` // to update
        }
    };
};
