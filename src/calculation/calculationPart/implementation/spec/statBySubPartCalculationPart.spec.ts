import { describe, expect, it } from "@jest/globals";
import { statBySubPartCalculationPart } from "../statBySubPartCalculationPart";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("statBySubPartCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatBySubPartCalculationPart = {
            __type: "StatBySubPartCalculationPart",
            mSubpart: undefined
        }

        const result = statBySubPartCalculationPart(inputMock, undefined).type

        expect(result).toEqual("StatBySubPartCalculationPart")
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
