import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { ChampionStatName } from "./utils/ChampionStatName";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatFormulaName } from "./utils/ChampionStatFormulaName";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPartProvider => {

    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total // default is total (Thresh/Rengar) ???
    const coefficient = inputData.mCoefficient

    return {
        type: "StatByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => coefficient * getStat(context, statName, formula),
        getString: (context: CalculationContext) => `${(coefficient * 100).toFixed()}% @${ChampionStatFormulaName[formula]}@ @${statName}@`,
        getItems: (context: CalculationContext) => [
            {
                type: "StatCalculationPart",
                coefficient,
                formula,
                statName
            }
        ]
    };
};
