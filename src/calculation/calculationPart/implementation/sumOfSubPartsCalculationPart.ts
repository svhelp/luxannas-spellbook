import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { mergeCalculationParts } from "./utils";

export const sumOfSubPartsCalculationPart = (subparts: CalculationPartProvider[]): CalculationPartProvider => {
    return {
        type: "SumOfSubPartsCalculationPart",
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])

            return mergeCalculationParts(itemsToMerge)
        }
    };
};
