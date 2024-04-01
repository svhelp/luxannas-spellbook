import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const numberCalculationPart = (inputData: NumberCalculationPart): CalculationPart => {

    const value = inputData.mNumber

    return {
        getValue: (context: CalculationContext) => value,
        getString: (context: CalculationContext) => value.toString()
    };
};
