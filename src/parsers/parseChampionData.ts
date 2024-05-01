import fnv from 'fnv-plus'
import { ChampionData } from "domain/ChampionData";
import { RootChampionData } from "domain/jsonSchema/RootChampionData";
import { Spell, SpellData } from "domain/jsonSchema/SpellData";

const rootDataKeyRegex = /Characters\/\w+\/CharacterRecords\/Root/

export const parseChampionData = (json: {[key: string]: any}): ChampionData => {
    const rootChampionDataKey = Object.keys(json).find(key => rootDataKeyRegex.test(key))

    if (!rootChampionDataKey) {
        throw new Error("Root champion data not found")
    }

    const rootChampionData: RootChampionData = json[rootChampionDataKey]
    
    const passiveSpellObject: SpellData = json[rootChampionData.mCharacterPassiveSpell]
    
    if (!passiveSpellObject) {
        throw new Error("Passive spell data not found")
    }

    for (const dataValue of passiveSpellObject.mSpell.mDataValues ?? []) {
        dataValue.mHashedName = `{${fnv.hash(dataValue.mName.toLowerCase(), 32).hex()}}`
    }

    const passiveSpellData = passiveSpellObject.mSpell

    const spellsData: Spell[] = rootChampionData.spellNames.map((spellName: string) => {
        const keyRegex = new RegExp(`Characters/\\w+/Spells/${spellName}$`)
        const spellDataKeys = Object.keys(json).filter(key => keyRegex.test(key))

        if (spellDataKeys.length !== 1) {
            throw new Error(`${spellName} spell key extraction error`)
        }

        const spellDataKey = spellDataKeys[0]
        const spellObject: SpellData = json[spellDataKey]

        for (const dataValue of spellObject.mSpell.mDataValues ?? []) {
            dataValue.mHashedName = `{${fnv.hash(dataValue.mName.toLowerCase(), 32).hex()}}`
        }

        return spellObject.mSpell
    })

    return {
        rootChampionData,
        passiveSpellData,
        spellsData
    }
}
