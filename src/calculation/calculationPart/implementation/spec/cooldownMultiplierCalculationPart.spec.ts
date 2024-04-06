import { describe, expect, it } from "@jest/globals";
import { cooldownMultiplierCalculationPart } from "../cooldownMultiplierCalculationPart";
import { CooldownMultiplierCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("cooldownMultiplierCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = cooldownMultiplierCalculationPart(inputMock).type

        expect(result).toEqual("CooldownMultiplierCalculationPart")
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
