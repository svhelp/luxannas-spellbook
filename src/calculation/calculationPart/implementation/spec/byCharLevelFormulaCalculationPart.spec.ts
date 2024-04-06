import { describe, expect, it } from "@jest/globals";
import { ByCharLevelFormulaCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { byCharLevelFormulaCalculationPart } from "../byCharLevelFormulaCalculationPart";

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
