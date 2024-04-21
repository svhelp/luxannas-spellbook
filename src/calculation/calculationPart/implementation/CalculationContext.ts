import { ChampionStats } from "domain/riotApiSchema/ChampionStats"

export type CalculationContext = {
    championLevel: number
    spellLevel: number
    
    currentStats: ChampionStats
    baseStats: ChampionStats
}
