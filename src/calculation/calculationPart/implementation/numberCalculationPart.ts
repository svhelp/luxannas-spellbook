import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const numberCalculationPart = (inputData: NumberCalculationPart): CalculationPartProvider => {

    // the value is null for KSante
    const value = inputData.mNumber ?? 1

    return {
        type: "NumberCalculationPart",
        getValue: (context: CalculationContext) => value,
        getString: (context: CalculationContext) => value.toString(),
        getItems: (context: CalculationContext) => [
            {
                type: "PlainCalculationPart",
                value
            }
        ]
    };
};
