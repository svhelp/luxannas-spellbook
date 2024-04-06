import { describe, expect, it } from "@jest/globals";
import { productOfSubPartsCalculationPart } from "../productOfSubPartsCalculationPart";

describe("productOfSubPartsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const result = productOfSubPartsCalculationPart(undefined, undefined).type

        expect(result).toEqual("ProductOfSubPartsCalculationPart")
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
