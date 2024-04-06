import "./mock"
import { describe, expect, it } from "@jest/globals";
import { effectValueCalculationPart } from "../effectValueCalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { CalculationContext } from "domain/CalculationContext";
import { spellMock } from "./constants";

const defaultContextMock: CalculationContext = {
    championLevel: 1,
    spellLevel: 1,
    
    currentStats: undefined,
    initStats: undefined
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

    it("Should use default value if 'mEffectAmount' not found", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 4
        }

        const result = effectValueCalculationPart(inputMock, spellMock).getValue(defaultContextMock)

        expect(result).toEqual(0)
    })

    it("Should use default value if 'mEffectAmount' has no values", () => {
        const inputMock: EffectValueCalculationPart = {
            __type: "EffectValueCalculationPart",
            mEffectIndex: 3
        }

        const result = effectValueCalculationPart(inputMock, spellMock).getValue(defaultContextMock)

        expect(result).toEqual(0)
    })

    describe("Should return value", () => {
        it.each([
            [ 0, 2, 2 ],
            [ 1, 4, 10 ],
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
        it.each([
            [ 0, 2, "200%" ],
            [ 1, 4, "10" ],
            [ 2, 2, "5%" ],
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
    
            const result = effectValueCalculationPart(inputMock, spellMock).getString(contextMock)
    
            expect(result).toEqual(expectedValue)
        })
    })
})
