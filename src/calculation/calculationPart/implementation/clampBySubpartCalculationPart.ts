import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { calculateValueByParts } from "./utils";

export const clampBySubpartCalculationPart = (inputData: ClampBySubpartCalculationPart, subparts: CalculationPartProvider[]): CalculationPartProvider => {

    const floor = inputData.mFloor
    const ceiling = inputData.mCeiling

    return {
        type: "ClampBySubpartCalculationPart",
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])
            const initValue = calculateValueByParts(context, itemsToMerge)

            const firstThresholdProcessed = floor ? Math.max(initValue, floor) : initValue
            const clampedValue = ceiling ? Math.min(firstThresholdProcessed, ceiling) : firstThresholdProcessed

            return [
                {
                    type: "PlainCalculationPart",
                    value: clampedValue
                }
            ]
        }
    };
};
