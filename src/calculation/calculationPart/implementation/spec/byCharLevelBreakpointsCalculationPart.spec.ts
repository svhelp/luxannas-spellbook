import { describe, expect, it } from "@jest/globals";
import { ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelBreakpointsCalculationPart } from "../byCharLevelBreakpointsCalculationPart";

describe("byCharLevelBreakpointsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ByCharLevelBreakpointsCalculationPart = {
            __type: "ByCharLevelBreakpointsCalculationPart",
            mLevel1Value: 1
        }

        const result = byCharLevelBreakpointsCalculationPart(inputMock).type

        expect(result).toEqual("ByCharLevelBreakpointsCalculationPart")
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
