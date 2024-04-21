import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { PlainCalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { calculateValueByParts } from "./utils";

// Sometimes there is a product of Gameplay parts
const defaultProductItem: PlainCalculationPart = {
    type: "PlainCalculationPart",
    value: 1
}

export const productOfSubPartsCalculationPart = (part1: CalculationPartProvider, part2: CalculationPartProvider): CalculationPartProvider => {
    return {
        type: "ProductOfSubPartsCalculationPart",
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
                    value: calculateValueByParts(context, subItems1) * calculateValueByParts(context, subItems2)
                }
            ]
        }
    };
};
