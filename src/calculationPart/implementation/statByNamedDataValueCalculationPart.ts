import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getDataValue } from "./utils/getDataValue";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";

export const statByNamedDataValueCalculationPart = (inputData: StatByNamedDataValueCalculationPart): CalculationPart => {
    
    const statName = inputData.mStat
    const formula = inputData.mStatFormula
    const dataValue = inputData.mDataValue

    const getValue = (context: CalculationContext) => {
        const value = getDataValue(context.spellData, dataValue, context.spellLevel)

        return getPercent(value) * getStat(context, statName as any, formula)
    }

    return {
        getValue,
        getString: (context: CalculationContext) => `${getValue(context)}%`
    };
};
