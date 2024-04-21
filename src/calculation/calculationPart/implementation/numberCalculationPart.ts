import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const numberCalculationPart = (inputData: NumberCalculationPart): CalculationPartProvider => {

    // the value is null for KSante
    const value = inputData.mNumber ?? 1

    return {
        type: "NumberCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "PlainCalculationPart",
                value
            }
        ]
    };
};
