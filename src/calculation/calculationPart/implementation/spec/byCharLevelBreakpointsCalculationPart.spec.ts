import { describe, expect, it } from "@jest/globals";
import { Breakpoint, ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelBreakpointsCalculationPart } from "../byCharLevelBreakpointsCalculationPart";
import { CalculationContext } from "domain/CalculationContext";

const breakpointMock1: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 9,
    '{57fdc438}': 1
}

const breakpointMock2: Breakpoint = {
    __type: 'Breakpoint',
    mLevel: 9,
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
                [ 10, 5, 1, 10 ],
                [ 10, 5, 12, 65 ],
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
                [ 5, 1, 12, "5 - 22 @level@" ],
                [ 5, 1, 1, "5 - 22 @level@" ],
                [ 5, 1, 5, "5 - 22 @level@" ],
                [ 5, 1, 12, "5 - 22 @level@" ],
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
                [ 5, 1, 1, breakpointMock1, 5 ],
                [ 5, 1, 5, breakpointMock1, 9 ],
                [ 5, 1, 12, breakpointMock1, 16 ],
                [ 5, 1, 1, breakpointMock2, 5 ],
                [ 5, 1, 5, breakpointMock2, 9 ],
                [ 5, 1, 12, breakpointMock2, 32 ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, step, championLevel, breakpoint, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    "{02deb550}": step,
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
                [ 5, 1, 1, breakpointMock1, "5 - 22 @level@" ],
                [ 5, 1, 12, breakpointMock1, "5 - 22 @level@" ],
                [ 5, 1, 1, breakpointMock2, "5 - 62 @level@" ],
                [ 5, 1, 12, breakpointMock2, "5 - 62 @level@" ],
            ])('mLevel1Value: $mLevel1Value, step: $step, championLevel: $championLevel', (mLevel1Value, step, championLevel, breakpoint, expectedValue) => {
                const inputMock: ByCharLevelBreakpointsCalculationPart = {
                    __type: "ByCharLevelBreakpointsCalculationPart",
                    mLevel1Value,
                    "{02deb550}": step,
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
