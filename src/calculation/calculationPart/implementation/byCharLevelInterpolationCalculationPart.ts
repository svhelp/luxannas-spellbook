import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelInterpolationCalculationPart = (inputData: ByCharLevelInterpolationCalculationPart): CalculationPart => {

    const start = inputData.mStartValue
    const end = inputData.mEndValue

    return {
        type: "ByCharLevelInterpolationCalculationPart",
        getValue: (context: CalculationContext) => start + (end - start) * (context.championLevel - 1) / 18,
        getString: (context: CalculationContext) => `${start} - ${end} @level@`
    };
};
