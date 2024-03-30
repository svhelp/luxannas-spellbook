import { RootChampionData } from "./jsonSchema/RootChampionData"
import { Spell } from "./jsonSchema/SpellData"

export type ChampionData = {
    rootChampionData: RootChampionData
    passiveSpellData: Spell
    spellsData: Spell[]
}
