import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";
import { ChampionStatName } from "./utils/ChampionStatName";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatFormulaName } from "./utils/ChampionStatFormulaName";

export const statBySubPartCalculationPart = (inputData: StatBySubPartCalculationPart, subpart: CalculationPartProvider): CalculationPartProvider => {
    
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "StatBySubPartCalculationPart",
        getValue: (context: CalculationContext) => subpart.getValue(context) * getStat(context, statName, formula),
        getString: (context: CalculationContext) => {
            return `${(subpart.getValue(context) * 100).toFixed()}% @${ChampionStatFormulaName[formula]}@ @${statName}@`
        }
    };
};
