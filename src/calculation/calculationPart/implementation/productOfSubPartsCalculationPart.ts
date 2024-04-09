import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";

export const productOfSubPartsCalculationPart = (part1: CalculationPartProvider, part2: CalculationPartProvider): CalculationPartProvider => {
    return {
        type: "ProductOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => part1.getValue(context) * part2.getValue(context),
        getString: (context: CalculationContext) => `${part1.getString(context)} * ${part2.getString(context)}`
    };
};
