import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelInterpolationCalculationPart = (inputData: ByCharLevelInterpolationCalculationPart): CalculationPartProvider => {

    const start = inputData.mStartValue
    const end = inputData.mEndValue

    return {
        type: "ByCharLevelInterpolationCalculationPart",
        getValue: (context: CalculationContext) => start + (end - start) * (context.championLevel - 1) / 17,
        getString: (context: CalculationContext) => `${start} - ${end} @level@`
    };
};
