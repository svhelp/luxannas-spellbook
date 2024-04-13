import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { combineCalculationParts } from "../../utils/combineCalculationParts";

export const clampBySubpartCalculationPart = (inputData: ClampBySubpartCalculationPart, subparts: CalculationPartProvider[]): CalculationPartProvider => {

    const floor = inputData.mFloor
    const ceiling = inputData.mCeiling

    const clampValue = (initValue: number) => {
        const firstThresholdProcessed = floor ? Math.max(initValue, floor) : initValue
        const secondThresholdProcessed = ceiling ? Math.min(firstThresholdProcessed, ceiling) : firstThresholdProcessed
    
        return secondThresholdProcessed
    }

    return {
        type: "ClampBySubpartCalculationPart",
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])
            const { value } = combineCalculationParts(context, itemsToMerge)

            return [
                {
                    type: "PlainCalculationPart",
                    value: clampValue(value)
                }
            ]
        }
    };
};
