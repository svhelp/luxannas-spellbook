import { Spell } from "domain/jsonSchema/SpellData"

export const getDataValue = (spellData: Spell, dataValue: string, spellLevel: number) => {
    return spellData.mDataValues.find(x => x.mName === dataValue).mValues[spellLevel]
}
