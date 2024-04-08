import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const numberCalculationPart = (inputData: NumberCalculationPart): CalculationPart => {

    // the value is null for KSante
    const value = inputData.mNumber ?? 1

    return {
        type: "NumberCalculationPart",
        getValue: (context: CalculationContext) => value,
        getString: (context: CalculationContext) => value.toString()
    };
};
