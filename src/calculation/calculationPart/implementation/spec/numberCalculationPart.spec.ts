import { describe, expect, it } from "@jest/globals";
import { numberCalculationPart } from "../numberCalculationPart";
import { NumberCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("numberCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: NumberCalculationPart = {
            __type: "NumberCalculationPart",
            mNumber: 1
        }

        const result = numberCalculationPart(inputMock).type

        expect(result).toEqual("NumberCalculationPart")
    })

    describe("Should return value", () => {
        it.each([
            [ 0, 0 ],
            [ 0.1, 0.1 ],
            [ 10, 10 ],
        ])('mNumber: $mNumber', (mNumber, expectedValue) => {
            const inputMock: NumberCalculationPart = {
                __type: "NumberCalculationPart",
                mNumber: mNumber
            }

            const result = numberCalculationPart(inputMock).getValue(undefined)

            expect(result).toEqual(expectedValue)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ 0, '0' ],
            [ 0.1, '0.1' ],
            [ 10, '10' ],
        ])('mNumber: $mNumber', (mNumber, expectedValue) => {
            const inputMock: NumberCalculationPart = {
                __type: "NumberCalculationPart",
                mNumber: mNumber
            }

            const result = numberCalculationPart(inputMock).getString(undefined)

            expect(result).toEqual(expectedValue)
        })
    })
})
