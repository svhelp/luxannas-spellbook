import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const clampBySubpartCalculationPart = (inputData: ClampBySubpartCalculationPart, subparts: CalculationPart[]): CalculationPart => {

    const floor = inputData.mFloor
    const ceiling = inputData.mCeiling

    const clamp = (value: number) => Math.min(Math.max(value, floor), ceiling)

    return {
        getValue: (context: CalculationContext) => clamp(subparts.reduce((accumulator, currentValue) => accumulator * currentValue.getValue(context), 1)),
        getString: (context: CalculationContext) => subparts.map(x => x.getString(context)).join(" * ")
    };
};
