import { describe, expect, it } from "@jest/globals";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { statByCoefficientCalculationPart } from "../statByCoefficientCalculationPart";

describe("statByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = statByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("StatByCoefficientCalculationPart")
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
