import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";

export const byCharLevelFormulaCalculationPart = (inputData: ByCharLevelFormulaCalculationPart): CalculationPart => {

    const values = inputData.mValues

    return {
        getValue: (context: CalculationContext) => values[context.championLevel],
        getString: (context: CalculationContext) => values[context.championLevel].toString()
    };
};
