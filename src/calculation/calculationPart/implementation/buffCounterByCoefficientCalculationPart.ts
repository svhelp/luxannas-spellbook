import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const buffCounterByCoefficientCalculationPart = (inputData: BuffCounterByCoefficientCalculationPart): CalculationPartProvider => {

    const coefficient = inputData.mCoefficient
    const buff = inputData.mBuffName
    const icon = inputData.mIconKey

    return {
        type: "BuffCounterByCoefficientCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "BuffCalculationPart",
                coefficient,
                buff: icon ?? buff
            }
        ]
    };
};
