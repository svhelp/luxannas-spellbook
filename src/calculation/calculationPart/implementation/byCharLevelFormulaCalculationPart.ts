import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelFormulaCalculationPart = (inputData: ByCharLevelFormulaCalculationPart): CalculationPartProvider => {

    const values = inputData.mValues

    return {
        type: "ByCharLevelFormulaCalculationPart",
        getValue: (context: CalculationContext) => values[context.championLevel],
        getString: (context: CalculationContext) => `${values[1]} - ${values[18]} @level@`
    };
};
