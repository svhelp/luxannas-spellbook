import { describe, expect, it } from "@jest/globals";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { abilityResourceByCoefficientCalculationPart } from "../abilityResourceByCoefficientCalculationPart";

describe("abilityResourceByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = abilityResourceByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("AbilityResourceByCoefficientCalculationPart")
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
