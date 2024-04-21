import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelInterpolationCalculationPart = (inputData: ByCharLevelInterpolationCalculationPart): CalculationPartProvider => {

    const start = inputData.mStartValue ?? 0
    const end = inputData.mEndValue ?? 0

    return {
        type: "ByCharLevelInterpolationCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "LevelCalculationPart",
                value: start + (end - start) * (context.championLevel - 1) / 17,
                min: start,
                max: end
            }
        ]
    };
};
