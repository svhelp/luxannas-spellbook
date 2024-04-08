import { describe, expect, it } from "@jest/globals";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelInterpolationCalculationPart } from "../byCharLevelInterpolationCalculationPart";
import { CalculationContext } from "domain/CalculationContext";

describe("byCharLevelInterpolationCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ByCharLevelInterpolationCalculationPart = {
            __type: "ByCharLevelInterpolationCalculationPart",
            mStartValue: 0,
            mEndValue: 10
        }

        const result = byCharLevelInterpolationCalculationPart(inputMock).type

        expect(result).toEqual("ByCharLevelInterpolationCalculationPart")
    })

    describe("Should return value", () => {
        it.each([
            [ 0, 170, 1, 0 ],
            [ 0, 170, 3, 20 ],
            [ 0, 170, 18, 170 ],
            [ 100, 1800, 1, 100 ],
            [ 100, 1800, 7, 700 ],
            [ 100, 1800, 18, 1800 ],
        ])('mStartValue: $mStartValue, mEndValue: $mEndValue, championLevel: $championLevel', (mStartValue, mEndValue, championLevel, expectedResult) => {
            const inputMock: ByCharLevelInterpolationCalculationPart = {
                __type: "ByCharLevelInterpolationCalculationPart",
                mStartValue,
                mEndValue
            }
            
            const contextMock: CalculationContext = {
                championLevel,
                spellLevel: 1,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = byCharLevelInterpolationCalculationPart(inputMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ 0, 100, 1, "0 - 100 @level@" ],
            [ 35, 500, 1, "35 - 500 @level@" ],
            [ 35, 500, 2, "35 - 500 @level@" ],
        ])('mStartValue: $mStartValue, mEndValue: $mEndValue, championLevel: $championLevel', (mStartValue, mEndValue, championLevel, expectedResult) => {
            const inputMock: ByCharLevelInterpolationCalculationPart = {
                __type: "ByCharLevelInterpolationCalculationPart",
                mStartValue,
                mEndValue
            }
            
            const contextMock: CalculationContext = {
                championLevel,
                spellLevel: 1,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = byCharLevelInterpolationCalculationPart(inputMock).getString(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
