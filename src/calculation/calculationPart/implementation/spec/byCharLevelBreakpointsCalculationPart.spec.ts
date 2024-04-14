import { describe, expect, it } from "@jest/globals";
import { Breakpoint, ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelBreakpointsCalculationPart } from "../byCharLevelBreakpointsCalculationPart";
import { CalculationContext } from "domain/CalculationContext";

const breakpointMock1_1: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 8,
    '{57fdc438}': 1
}

const breakpointMock1_2: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 10,
    '{57fdc438}': 2
}

const breakpointMock2_1: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 8,
    '{d5fd07ed}': 1
}

const breakpointMock2_2: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 10,
    '{d5fd07ed}': 5
}

describe("byCharLevelBreakpointsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ByCharLevelBreakpointsCalculationPart = {
            __type: "ByCharLevelBreakpointsCalculationPart",
            mLevel1Value: 1
        }

        const result = byCharLevelBreakpointsCalculationPart(inputMock).type

        expect(result).toEqual("ByCharLevelBreakpointsCalculationPart")
    })

    it("Should use default values", () => {
        const inputMock: ByCharLevelBreakpointsCalculationPart = {
            __type: "ByCharLevelBreakpointsCalculationPart",
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

        const result = byCharLevelBreakpointsCalculationPart(inputMock).getItems(contextMock)

        expect(result).toEqual(expectedResult)
    })
    
    describe("Should return items", () => {
        describe("Linear progression", () => {
            it.each([
                [ 5, 1, 1 ],
                [ 5, 1, 10 ],
                [ 5, 1, 18 ],
                [ 10, 5, 1 ],
                [ 10, 5, 12 ],
                [ 10, 5, 18 ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, step, championLevel) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    "{02deb550}": step
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
                        value: mLevel1Value + step * (championLevel - 1),
                        min: mLevel1Value,
                        max: mLevel1Value + step * 17
                    }
                ]
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
            })
        })
        
        describe("Step progression", () => {
            it.each([
                [ 5, breakpointMock2_1, 1, 5 ],
                [ 5, breakpointMock2_1, 7, 5 ],
                [ 5, breakpointMock2_1, 8, 6 ],
                [ 5, breakpointMock2_1, 18, 6 ],
                [ 10, breakpointMock2_2, 1, 10 ],
                [ 10, breakpointMock2_2, 9, 10 ],
                [ 10, breakpointMock2_2, 10, 15 ],
                [ 10, breakpointMock2_2, 18, 15 ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, breakpoint, championLevel, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    mBreakpoints: [ breakpoint ]
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
                        min: mLevel1Value,
                        max: mLevel1Value + breakpoint["{d5fd07ed}"]
                    }
                ]
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
            })
        })
        
        describe("Complex progression", () => {
            it.each([
                [ 5, breakpointMock1_1, 1, 16, 5 ],
                [ 5, breakpointMock1_1, 5, 16, 5 ],
                [ 5, breakpointMock1_1, 12, 16, 10 ],
                [ 5, breakpointMock1_1, 18, 16, 16 ],
                [ 10, breakpointMock1_2, 1, 28, 10 ],
                [ 10, breakpointMock1_2, 5, 28, 10 ],
                [ 10, breakpointMock1_2, 12, 28, 16 ],
                [ 10, breakpointMock1_2, 18, 28, 28 ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, breakpoint, championLevel, maxValue, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    mBreakpoints: [ breakpoint ]
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
                        min: mLevel1Value,
                        max: maxValue
                    }
                ]
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
            })
        })
    })
})
