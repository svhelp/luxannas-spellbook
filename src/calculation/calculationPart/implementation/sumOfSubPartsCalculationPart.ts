import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { mergeCalculationParts } from "./utils/mergeCalculationParts";

export const sumOfSubPartsCalculationPart = (subparts: CalculationPartProvider[]): CalculationPartProvider => {
    return {
        type: "SumOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => subparts.reduce((accumulator, currentValue) => accumulator + currentValue.getValue(context), 0),
        getString: (context: CalculationContext) => subparts.map(x => x.getString(context)).join(" + "),
        getItems: (context: CalculationContext) => {
            const itemsToMerge = subparts.reduce((acc, subpart) => acc.concat(subpart.getItems(context)), [] as CalculationPart[])

            return mergeCalculationParts(itemsToMerge)
        }
    };
};
