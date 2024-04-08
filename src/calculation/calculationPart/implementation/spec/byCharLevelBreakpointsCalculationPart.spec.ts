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

    it("Default init value should be 0", () => {
        const inputMock: ByCharLevelBreakpointsCalculationPart = {
            __type: "ByCharLevelBreakpointsCalculationPart",
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: undefined,
            initStats: undefined
        }

        const result = byCharLevelBreakpointsCalculationPart(inputMock).getValue(contextMock)

        expect(result).toEqual(0)
    })

    describe('Linear progression', () => {
        describe("Should return value", () => {
            it.each([
                [ 5, 1, 1, 5 ],
                [ 5, 1, 10, 14 ],
                [ 5, 1, 18, 22 ],
                [ 10, 5, 1, 10 ],
                [ 10, 5, 12, 65 ],
                [ 10, 5, 18, 95 ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, step, championLevel, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    "{02deb550}": step
                }
        
                const contextMock: CalculationContext = {
                    championLevel,
                    spellLevel: 1,
                    
                    currentStats: undefined,
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getValue(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
        
        describe("Should return string value", () => {
            it.each([
                [ 5, 1, 1, "5 - 22 @level@" ],
                [ 5, 1, 5, "5 - 22 @level@" ],
                [ 5, 1, 18, "5 - 22 @level@" ],
                [ 10, 5, 1, "10 - 95 @level@" ],
                [ 10, 5, 15, "10 - 95 @level@" ],
                [ 10, 5, 18, "10 - 95 @level@" ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, step, championLevel, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    "{02deb550}": step
                }
        
                const contextMock: CalculationContext = {
                    championLevel,
                    spellLevel: 1,
                    
                    currentStats: undefined,
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getString(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
    })
    
    describe('Complex progression', () => {
        describe("Should return value", () => {
            it.each([
                [ 5, breakpointMock1_1, 1, 5 ],
                [ 5, breakpointMock1_1, 5, 5 ],
                [ 5, breakpointMock1_1, 12, 10 ],
                [ 5, breakpointMock1_1, 18, 16 ],
                [ 10, breakpointMock1_2, 1, 10 ],
                [ 10, breakpointMock1_2, 5, 10 ],
                [ 10, breakpointMock1_2, 12, 16 ],
                [ 10, breakpointMock1_2, 18, 28 ],
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
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getValue(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
        
        describe("Should return string value", () => {
            it.each([
                [ 5, breakpointMock1_1, 1, "5 - 16 @level@" ],
                [ 5, breakpointMock1_1, 18, "5 - 16 @level@" ],
                [ 10, breakpointMock1_2, 1, "10 - 28 @level@" ],
                [ 10, breakpointMock1_2, 18, "10 - 28 @level@" ],
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
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getString(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
    })

    describe('Single additions breakpoint', () => {
        describe("Should return value", () => {
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
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getValue(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
        
        describe("Should return string value", () => {
            it.each([
                [ 5, breakpointMock2_1, 1, "5 - 6 @level@" ],
                [ 5, breakpointMock2_1, 18, "5 - 6 @level@" ],
                [ 10, breakpointMock2_2, 1, "10 - 15 @level@" ],
                [ 10, breakpointMock2_2, 18, "10 - 15 @level@" ],
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
                    initStats: undefined
                }
        
                const result = byCharLevelBreakpointsCalculationPart(inputMock).getString(contextMock)
        
                expect(result).toEqual(expectedValue)
            })
        })
    })
})
