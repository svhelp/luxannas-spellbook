import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { mergeCalculationParts } from "./utils/mergeCalculationParts";

export const sumOfSubPartsCalculationPart = (subparts: CalculationPartProvider[]): CalculationPartProvider => {
    return {
        type: "SumOfSubPartsCalculationPart",
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])

            return mergeCalculationParts(itemsToMerge)
        }
    };
};
