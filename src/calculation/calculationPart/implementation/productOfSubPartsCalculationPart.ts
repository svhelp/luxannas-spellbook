import { combineCalculationParts } from "../../utils/combineCalculationParts";
import { CalculationContext } from "domain/CalculationContext";
import { PlainCalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";

const defaultProductItem: PlainCalculationPart = {
    type: "PlainCalculationPart",
    value: 1
}

export const productOfSubPartsCalculationPart = (part1: CalculationPartProvider, part2: CalculationPartProvider): CalculationPartProvider => {
    return {
        type: "ProductOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => part1.getValue(context) * part2.getValue(context),
        getString: (context: CalculationContext) => `${part1.getString(context)} * ${part2.getString(context)}`,
        getItems: (context: CalculationContext) => {
            const subItems1 = part1.getItems(context)
            const subItems2 = part2.getItems(context)

            if (subItems1.length === 0) {
                subItems1.push(defaultProductItem)
            }
            
            if (subItems2.length === 0) {
                subItems2.push(defaultProductItem)
            }

            return [
                {
                    type: "PlainCalculationPart",
                    value: combineCalculationParts(context, subItems1).value * combineCalculationParts(context, subItems2).value
                }
            ]
        }
    };
};
