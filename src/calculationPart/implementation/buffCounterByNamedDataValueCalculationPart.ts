import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { getDataValue } from "./utils/getDataValue";

export const buffCounterByNamedDataValueCalculationPart = (inputData: BuffCounterByNamedDataValueCalculationPart): CalculationPart => {
    
    const dataValue = inputData.mDataValue
    const buff = inputData.mBuffName

    const getValue = (context: CalculationContext) => {
        const value = getDataValue(context.spellData, dataValue, context.spellLevel)

        return getPercent(value)
    }

    return {
        getValue,
        getString: (context: CalculationContext) => `${getValue(context)}% ${buff}`
    };
};
