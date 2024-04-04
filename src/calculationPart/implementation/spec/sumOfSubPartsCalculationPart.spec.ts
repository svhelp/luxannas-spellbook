import { describe, expect, it } from "@jest/globals";
import { sumOfSubPartsCalculationPart } from "../sumOfSubPartsCalculationPart";

describe("sumOfSubPartsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const result = sumOfSubPartsCalculationPart([]).type

        expect(result).toEqual("SumOfSubPartsCalculationPart")
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
