import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart, SimpleCalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { combineCalculationParts } from "../../utils/combineCalculationParts";

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
        getString: (context: CalculationContext) => `${getValue(context) * 100}%`,
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])
            const { value } = combineCalculationParts(context, itemsToMerge)

            return [
                {
                    type: "PlainCalculationPart",
                    value
                }
            ]
        }
    };
};
