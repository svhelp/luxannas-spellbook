import { Spell } from "./jsonSchema/SpellData"
import { ChampionStats } from "./riotApiSchema/ChampionStats"

export type CalculationContext = {
    championLevel: number
    spellLevel: number
    
    currentStats: ChampionStats
    initStats: ChampionStats
    spellData: Spell
}
