import { describe, expect, it } from "@jest/globals";
import { buffCounterByCoefficientCalculationPart } from "../buffCounterByCoefficientCalculationPart";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("buffCounterByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: BuffCounterByCoefficientCalculationPart = {
            __type: "BuffCounterByCoefficientCalculationPart",
            mCoefficient: 1,
            mBuffName: 'BuffNameMock'
        }

        const result = buffCounterByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("BuffCounterByCoefficientCalculationPart")
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
