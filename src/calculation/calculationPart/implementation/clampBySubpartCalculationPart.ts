import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const clampBySubpartCalculationPart = (inputData: ClampBySubpartCalculationPart, subparts: CalculationPartProvider[]): CalculationPartProvider => {

    const floor = inputData.mFloor
    const ceiling = inputData.mCeiling

    const getValue = (context: CalculationContext) => {
        const initValue = subparts.reduce((accumulator, currentValue) => accumulator + currentValue.getValue(context), 0)

        const firstThresholdProcessed = floor ? Math.max(initValue, floor) : initValue
        const secondThresholdProcessed = ceiling ? Math.min(firstThresholdProcessed, ceiling) : firstThresholdProcessed

        return secondThresholdProcessed
    }

    return {
        type: "ClampBySubpartCalculationPart",
        getValue,
        getString: (context: CalculationContext) => `${getValue(context) * 100}%`
    };
};
