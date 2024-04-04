import { describe, expect, it } from "@jest/globals";
import { clampBySubpartCalculationPart } from "../clampBySubpartCalculationPart";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("clampBySubpartCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ClampBySubpartCalculationPart = {
            __type: "{803dae4c}",
            mCeiling: 0,
            mFloor: 10,
            mSubparts: []
        }

        const result = clampBySubpartCalculationPart(inputMock, []).type

        expect(result).toEqual("ClampBySubpartCalculationPart")
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
