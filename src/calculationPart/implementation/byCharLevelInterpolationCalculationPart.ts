import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelInterpolationCalculationPart = (inputData: ByCharLevelInterpolationCalculationPart): CalculationPart => {

    const start = inputData.mStartValue
    const end = inputData.mEndValue

    const getValue = (context: CalculationContext) => start + (end - start) * context.championLevel / 18

    return {
        getValue,
        getString: (context: CalculationContext) => getValue(context).toString()
    };
};
