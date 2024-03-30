import { ChampionData } from "domain/ChampionData";
import { RootChampionData } from "domain/jsonSchema/RootChampionData";
import { Spell, SpellData } from "domain/jsonSchema/SpellData";

const rootDataKeyRegex = /Characters\/\w+\/CharacterRecords\/Root/

export const parseChampionData = (json: {[key: string]: any}): ChampionData => {
    const rootChampionDataKey = Object.keys(json).find(key => rootDataKeyRegex.test(key))

    if (!rootChampionDataKey) {
        throw new Error("root champion data not found")
    }

    const rootChampionData: RootChampionData = json[rootChampionDataKey]
    
    const passiveSpellObject: SpellData = json[rootChampionData.mCharacterPassiveSpell]
    const passiveSpellData = passiveSpellObject.mSpell

    const spellsData: Spell[] = rootChampionData.spellNames.map((spellName: string) => {
        const keyRegex = new RegExp(`Characters/\\w+/Spells/${spellName}$`)
        const spellDataKeys = Object.keys(json).filter(key => keyRegex.test(key))

        if (spellDataKeys.length !== 1) {
            throw new Error(`${keyRegex} spell key extraction error`)
        }

        const spellObject: SpellData = json[spellDataKeys[0]]

        return spellObject.mSpell
    })

    return {
        rootChampionData,
        passiveSpellData,
        spellsData
    }
}
