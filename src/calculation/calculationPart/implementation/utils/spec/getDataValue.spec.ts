import { describe, expect, it } from "@jest/globals"
import { getDataValue } from "../getDataValue"
import { Spell } from "domain/jsonSchema/SpellData"

const dataValues1Mock = [ 0, 1, 2, 3, 4, 5 ]
const dataValues2Mock = [ 6, 7, 8, 9, 10, 11 ]
const dataValues3Mock = [ 0, .01, .05, .1, .2, .5]

const spellMock: Spell = {
    mClientData: undefined,
    mDataValues: [
        {
            mName: "DataValueMock1",
            mValues: dataValues1Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock2",
            mValues: dataValues2Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock3",
            mHashedName: "hashed_name_mock",
            mValues: dataValues3Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock4",
            __type: "SpellDataValue"
        },
    ],
    __type: "SpellDataResource"
}

describe("getDataValue", () => {
    it ('Should extract by plain name', () => {
        const result = getDataValue(spellMock, "DataValueMock2")
        
        expect(result).toEqual(dataValues2Mock)
    })

    it ('Should extract by plain name with another casing', () => {
        const result = getDataValue(spellMock, "datavaluemock1")
        
        expect(result).toEqual(dataValues1Mock)
    })
    
    it ('Should extract by hashed name', () => {
        const result = getDataValue(spellMock, "hashed_name_mock")
        
        expect(result).toEqual(dataValues3Mock)
    })

    it ('Should return default value if mValues is not presented', () => {
        const result = getDataValue(spellMock, "DataValueMock4")
        
        expect(result).toEqual([ 1, 1, 1, 1, 1 ])
    })
    
    it ('Should throw in case value not found', () => {
        expect(() => getDataValue(spellMock, "DataValueMock5")).toThrow("Data value 'DataValueMock5' not found")
    })
})
