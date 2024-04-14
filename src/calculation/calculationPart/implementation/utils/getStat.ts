import { CalculationContext } from "domain/CalculationContext";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStats, NonCountableStats } from "domain/riotApiSchema/ChampionStats";

export const getStat = (context: CalculationContext, statName: keyof ChampionStats | keyof NonCountableStats, formula?: ChampionStatFormula) => {

    if ("percentMissingHealth" == statName) {
        return 1
    }

    if (formula === ChampionStatFormula.Total) {
        return context.currentStats[statName]
    }

    if (formula === ChampionStatFormula.Bonus) {
        return context.currentStats[statName] - context.baseStats[statName]
    }

    return context.baseStats[statName]
}