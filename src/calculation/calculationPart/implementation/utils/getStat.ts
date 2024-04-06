import { CalculationContext } from "domain/CalculationContext";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";

export const getStat = (context: CalculationContext, statName: keyof ChampionStats, formula?: ChampionStatFormula) => {
    if (formula === ChampionStatFormula.Total) {
        return context.currentStats[statName]
    }

    if (formula === ChampionStatFormula.Bonus) {
        return context.currentStats[statName] - context.initStats[statName]
    }

    return context.initStats[statName]
}