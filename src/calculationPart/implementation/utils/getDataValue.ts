import { Spell } from "domain/jsonSchema/SpellData"

export const getDataValue = (spell: Spell, dataName: string) => {
    const dataValueName = dataName.toLowerCase()

    const dataValue = spell.mDataValues.find(x => x.mName.toLowerCase() === dataValueName || x.mHashedName === dataValueName)

    if (!dataValue) {
        throw new Error(`Data value '${dataName}' not found`)
    }

    return dataValue.mValues
}
