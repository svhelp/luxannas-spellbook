import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getDataValue } from "./utils/getDataValue";
import { getPercent } from "./utils/getPercent";

export const namedDataValueCalculationPart = (inputData: NamedDataValueCalculationPart): CalculationPart => {
    
    const dataValue = inputData.mDataValue

    return {
        getValue: (context: CalculationContext) => getDataValue(context.spellData, dataValue, context.spellLevel),
        getString: (context: CalculationContext) =>
            getPercent(getDataValue(context.spellData, dataValue, context.spellLevel), 3).toString()
    };
};
