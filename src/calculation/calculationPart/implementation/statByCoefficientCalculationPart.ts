import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { ChampionStatName } from "./utils/ChampionStatName";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPart => {

    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula
    const coefficient = inputData.mCoefficient

    return {
        type: "StatByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => coefficient * getStat(context, statName, formula),
        getString: (context: CalculationContext) => `${(coefficient * 100).toFixed()}% @${statName}@`
    };
};
