import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";

export const productOfSubPartsCalculationPart = (part1: CalculationPart, part2: CalculationPart): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => part1.getValue(context) * part2.getValue(context),
        getString: (context: CalculationContext) => `${part1.getString(context)} * ${part2.getString(context)}`
    };
};
