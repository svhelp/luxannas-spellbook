import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";

export const sumOfSubPartsCalculationPart = (subparts: CalculationPart[]): CalculationPart => {
    return {
        getValue: (context: CalculationContext) => subparts.reduce((accumulator, currentValue) => accumulator + currentValue.getValue(context), 0),
        getString: (context: CalculationContext) => subparts.map(x => x.getString(context)).join(" + ")
    };
};
