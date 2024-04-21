import { describe, expect, it } from "@jest/globals";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelInterpolationCalculationPart } from "../byCharLevelInterpolationCalculationPart";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";

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

    it("Should use default values", () => {
        const inputMock: ByCharLevelInterpolationCalculationPart = {
            __type: "ByCharLevelInterpolationCalculationPart"
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: undefined,
            baseStats: undefined
        }

        const expectedResult = [
            {
                type: "LevelCalculationPart",
                value: 0,
                min: 0,
                max: 0
            }
        ]
        
        const result = byCharLevelInterpolationCalculationPart(inputMock).getItems(contextMock)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 0, 170, 1, 0 ],
            [ 0, 170, 3, 20 ],
            [ 0, 170, 18, 170 ],
            [ 100, 1800, 1, 100 ],
            [ 100, 1800, 7, 700 ],
            [ 100, 1800, 18, 1800 ],
        ])('mStartValue: $mStartValue, mEndValue: $mEndValue, championLevel: $championLevel',
            (mStartValue, mEndValue, championLevel, expectedValue) => {
                const inputMock: ByCharLevelInterpolationCalculationPart = {
                    __type: "ByCharLevelInterpolationCalculationPart",
                    mStartValue,
                    mEndValue
                }
            
                const contextMock: CalculationContext = {
                    championLevel,
                    spellLevel: 1,
                    
                    currentStats: undefined,
                    baseStats: undefined
                }
                
                const expectedResult = [
                    {
                        type: "LevelCalculationPart",
                        value: expectedValue,
                        min: mStartValue,
                        max: mEndValue
                    }
                ]
        
                const result = byCharLevelInterpolationCalculationPart(inputMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
        })
    })
})
