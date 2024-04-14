import { describe, expect, it } from "@jest/globals";
import { effectValueCalculationPart } from "../effectValueCalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { CalculationContext } from "domain/CalculationContext";
import { spellMock } from "./constants";

const defaultContextMock: CalculationContext = {
    championLevel: 1,
    spellLevel: 1,
    
    currentStats: undefined,
    baseStats: undefined
}

const expectedDefaultResult = [
    {
        type: "PlainCalculationPart",
        value: 0
    }
]

describe("effectValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 1
        }

        const result = effectValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("EffectValueCalculationPart")
    })

    it("Should use default value if 'mEffectAmount' not found", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 5
        }

        const result = effectValueCalculationPart(inputMock, spellMock).getItems(defaultContextMock)

        expect(result).toEqual(expectedDefaultResult)
    })

    it("Should use default value if 'mEffectAmount' has no values", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 4
        }

        const result = effectValueCalculationPart(inputMock, spellMock).getItems(defaultContextMock)

        expect(result).toEqual(expectedDefaultResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 1, 2 ],
            [ 2, 4 ],
            [ 3, 2 ],
        ])('mEffectIndex: $mEffectIndex, spellLevel: $spellLevel', (mEffectIndex, spellLevel) => {
            const inputMock: EffectValueCalculationPart = {
                __type: "EffectValueCalculationPart",
                mEffectIndex
            }
    
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: spellLevel,
                
                currentStats: undefined,
                baseStats: undefined
            }
        
            const expectedResult = [
                {
                    type: "PlainCalculationPart",
                    value: spellMock.mEffectAmount[mEffectIndex - 1].value[spellLevel]
                }
            ]
    
            const result = effectValueCalculationPart(inputMock, spellMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
