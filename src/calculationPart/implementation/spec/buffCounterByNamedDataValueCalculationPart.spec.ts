import { describe, expect, it } from "@jest/globals";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { buffCounterByNamedDataValueCalculationPart } from "../buffCounterByNamedDataValueCalculationPart";
import { Spell } from "domain/jsonSchema/SpellData";

const spellMock: Spell = {
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

describe("buffCounterByNamedDataValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: BuffCounterByNamedDataValueCalculationPart = {
            __type: "BuffCounterByNamedDataValueCalculationPart",
            mBuffName: 'BuffNameMock',
            mDataValue: 'DataValueMock1'
        }

        const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("BuffCounterByNamedDataValueCalculationPart")
    })

    describe("Should return value", () => {
        // it.each([
        //     []
        // ])('mNumber: $mNumber', () => {

        // })
    })
    
    describe("Should return string value", () => {
        // it.each([
        //     []
        // ])('mNumber: $mNumber', () => {

        // })
    })
})
