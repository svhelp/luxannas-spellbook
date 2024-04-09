import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const buffCounterByCoefficientCalculationPart = (inputData: BuffCounterByCoefficientCalculationPart): CalculationPartProvider => {

    const coefficient = inputData.mCoefficient
    const buff = inputData.mBuffName
    const icon = inputData.mIconKey

    return {
        type: "BuffCounterByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => 0,
        getString: (context: CalculationContext) => `${(coefficient * 100).toFixed()}% @${icon ?? buff}@`
    };
};
