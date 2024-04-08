import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";
import { ChampionStatName } from "./utils/ChampionStatName";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

export const statBySubPartCalculationPart = (inputData: StatBySubPartCalculationPart, subpart: CalculationPart): CalculationPart => {
    
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "StatBySubPartCalculationPart",
        getValue: (context: CalculationContext) => {
            return subpart.getValue(context) * getStat(context, statName, formula)
        },
        getString: (context: CalculationContext) => {
            return `${getPercent(getStat(context, statName as any, formula))}% ${formula} STAT`
        }
    };
};
