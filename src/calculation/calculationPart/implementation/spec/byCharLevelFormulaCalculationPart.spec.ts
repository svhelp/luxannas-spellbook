import { describe, expect, it } from "@jest/globals";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelFormulaCalculationPart } from "../byCharLevelFormulaCalculationPart";
import { CalculationContext } from "domain/CalculationContext";

const valuesMock1 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
const valuesMock2 = [ 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 200, 201, 202, 203, 204, 205, 206, 207, 208 ]

describe("byCharLevelFormulaCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ByCharLevelFormulaCalculationPart = {
            __type: "ByCharLevelFormulaCalculationPart",
            mValues: [ 0, 1, 2, 3, 4 ]
        }

        const result = byCharLevelFormulaCalculationPart(inputMock).type

        expect(result).toEqual("ByCharLevelFormulaCalculationPart")
    })

    describe("Should return value", () => {
        it.each([
            [ valuesMock1, 1, 1 ],
            [ valuesMock1, 5, 5 ],
            [ valuesMock1, 15, 15 ],
            [ valuesMock1, 18, 18 ],
            [ valuesMock2, 1, 101 ],
            [ valuesMock2, 5, 105 ],
            [ valuesMock2, 15, 205 ],
            [ valuesMock2, 18, 208 ],
        ])('mValues: $mValues, championLevel: $championLevel', (mValues, championLevel, expectedResult) => {
            const inputMock: ByCharLevelFormulaCalculationPart = {
                __type: "ByCharLevelFormulaCalculationPart",
                mValues
            }
    
            const contextMock: CalculationContext = {
                championLevel,
                spellLevel: 1,
                
                currentStats: undefined,
                initStats: undefined
            }
            
            const result = byCharLevelFormulaCalculationPart(inputMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ valuesMock1, 1, "1 - 18 @level@" ],
            [ valuesMock1, 5, "1 - 18 @level@"],
            [ valuesMock1, 18, "1 - 18 @level@" ],
            [ valuesMock2, 1, "101 - 208 @level@" ],
            [ valuesMock2, 5, "101 - 208 @level@" ],
            [ valuesMock2, 18, "101 - 208 @level@"],
        ])('mValues: $mValues, championLevel: $championLevel', (mValues, championLevel, expectedResult) => {
            const inputMock: ByCharLevelFormulaCalculationPart = {
                __type: "ByCharLevelFormulaCalculationPart",
                mValues
            }
    
            const contextMock: CalculationContext = {
                championLevel,
                spellLevel: 1,
                
                currentStats: undefined,
                initStats: undefined
            }
            
            const result = byCharLevelFormulaCalculationPart(inputMock).getString(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
