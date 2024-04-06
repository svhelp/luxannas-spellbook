import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";

export const buffCounterByCoefficientCalculationPart = (inputData: BuffCounterByCoefficientCalculationPart): CalculationPart => {

    const coefficient = inputData.mCoefficient
    const buff = inputData.mBuffName

    return {
        type: "BuffCounterByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => getPercent(coefficient),
        getString: (context: CalculationContext) => `${getPercent(coefficient)}% ${buff}`
    };
};
