import { describe, expect, it } from "@jest/globals";
import { effectValueCalculationPart } from "../effectValueCalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";
import { CalculationContext } from "domain/CalculationContext";

const spellMock: Spell = {
    mClientData: undefined,
    mEffectAmount: [
        {
            value: [ 0, 1, 2, 3, 4, 5 ],
            __type: "SpellEffectAmount"
        },
        {
            value: [ 6, 7, 8, 9, 10, 11 ],
            __type: "SpellEffectAmount"
        },
        {
            value: [ 0, .01, .05, .1, .2, .5],
            __type: "SpellEffectAmount"
        },
    ],
    __type: "SpellDataResource"
}

describe("effectValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 1
        }

        const result = effectValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("EffectValueCalculationPart")
    })

    describe("Should return value", () => {
        it.each([
            [ 0, 2, 2 ],
            [ 0, 4, 4 ],
            [ 2, 2, .05 ],
        ])('effectIndex: $effectIndex, skillLevel: $skillLevel', (effectIndex, skillLevel, expectedValue) => {
            const inputMock: EffectValueCalculationPart = {
                __type: "EffectValueCalculationPart",
                mEffectIndex: effectIndex
            }

            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: skillLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = effectValueCalculationPart(inputMock, spellMock).getValue(contextMock)
    
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
