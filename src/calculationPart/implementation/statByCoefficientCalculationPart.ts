import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPart => {

    const statName = inputData.mStat
    const formula = inputData.mStatFormula
    const coefficient = inputData.mCoefficient

    return {
        getValue: (context: CalculationContext) => {
            return getPercent(coefficient) * getStat(context, statName as any, formula)
        },
        getString: (context: CalculationContext) => `${getPercent(coefficient)}% ${formula} STAT`
    };
};
