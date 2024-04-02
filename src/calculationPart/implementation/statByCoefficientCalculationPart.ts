import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ChampionStatName } from "./utils/ChampionStatName";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPart => {

    const statName = ChampionStatName[inputData.mStat]
    const formula = inputData.mStatFormula
    const coefficient = inputData.mCoefficient

    return {
        type: "StatByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => {
            return getPercent(coefficient) * getStat(context, statName, formula)
        },
        getString: (context: CalculationContext) => `${getPercent(coefficient)}% ${formula} STAT`
    };
};
