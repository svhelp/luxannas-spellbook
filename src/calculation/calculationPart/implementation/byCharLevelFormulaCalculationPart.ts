import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelFormulaCalculationPart = (inputData: ByCharLevelFormulaCalculationPart): CalculationPartProvider => {

    const values = inputData.mValues

    return {
        type: "ByCharLevelFormulaCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "LevelCalculationPart",
                value: values[context.championLevel],
                min: values[1],
                max: values[18]
            }
        ]
    };
};
