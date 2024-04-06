import { describe, expect, it } from "@jest/globals";
import { ByCharLevelInterpolationCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelInterpolationCalculationPart } from "../byCharLevelInterpolationCalculationPart";

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
