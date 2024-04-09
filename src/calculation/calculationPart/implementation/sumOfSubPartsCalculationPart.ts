import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";

export const sumOfSubPartsCalculationPart = (subparts: CalculationPartProvider[]): CalculationPartProvider => {
    return {
        type: "SumOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => subparts.reduce((accumulator, currentValue) => accumulator + currentValue.getValue(context), 0),
        getString: (context: CalculationContext) => subparts.map(x => x.getString(context)).join(" + ")
    };
};
