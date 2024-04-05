import { describe, expect, it } from "@jest/globals";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";
import { namedDataValueCalculationPart } from "../namedDataValueCalculationPart";
import { CalculationContext } from "domain/CalculationContext";

const spellMock: Spell = {
    mClientData: undefined,
    mDataValues: [
        {
            mName: "DataValueMock1",
            mValues: [ 0, 1, 2, 3, 4, 5 ],
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock2",
            mValues: [ 6, 7, 8, 9, 10, 11 ],
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock3",
            mValues: [ 0, .01, .05, .1, .2, .5],
            __type: "SpellDataValue"
        },
    ],
    __type: "SpellDataResource"
}

// TODO: Add case sensitive test
describe("namedDataValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: NamedDataValueCalculationPart = {
            __type: "NamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        const result = namedDataValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("NamedDataValueCalculationPart")
    })

    describe("Should return value", () => {
        it.each([
            [ "DataValueMock1", 2, 2 ],
            [ "DataValueMock1", 4, 4 ],
            [ "DataValueMock3", 2, .05 ],
        ])('dateValue: $dateValue, skillLevel: $skillLevel', (dateValue, skillLevel, expectedValue) => {
            const inputMock: NamedDataValueCalculationPart = {
                __type: "NamedDataValueCalculationPart",
                mDataValue: dateValue
            }

            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: skillLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = namedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)
    
            expect(result).toEqual(expectedValue)
        })
    })
    
    describe("Should return string value", () => {
        // it.each([
        //     []
        // ])('mNumber: $mNumber', () => {

        // })
    })
})
