import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { ChampionStatName } from "./domain";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { calculateValueByParts } from "./utils";

export const statBySubPartCalculationPart = (inputData: StatBySubPartCalculationPart, subpart: CalculationPartProvider): CalculationPartProvider => {
    
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "StatBySubPartCalculationPart",
        getItems: (context: CalculationContext) => {
            const items = subpart.getItems(context)
            const coefficient = calculateValueByParts(context, items)

            return [
                {
                    type: "StatCalculationPart",
                    coefficient,
                    formula,
                    statName,
                }
            ]
        }
    };
};
