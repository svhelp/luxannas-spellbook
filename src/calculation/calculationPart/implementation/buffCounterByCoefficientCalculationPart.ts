import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const buffCounterByCoefficientCalculationPart = (inputData: BuffCounterByCoefficientCalculationPart): CalculationPart => {

    const coefficient = inputData.mCoefficient
    const buff = inputData.mBuffName
    const icon = inputData.mIconKey

    return {
        type: "BuffCounterByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => 0,
        getString: (context: CalculationContext) => `${(coefficient * 100).toFixed()}% @${icon ?? buff}@`
    };
};
