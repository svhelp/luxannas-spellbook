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

    it("Should use default value (Ksante Q)", () => {
        const inputMock: NumberCalculationPart = {
            __type: "NumberCalculationPart",
        }

        const expectedResult = [
            {
                type: "PlainCalculationPart",
                value: 1
            }
        ]

        const result = numberCalculationPart(inputMock).getItems(undefined)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 0.01 ],
            [ 2 ],
            [ 50 ],
        ])('mNumber: $mNumber', (mNumber) => {
            const inputMock: NumberCalculationPart = {
                __type: "NumberCalculationPart",
                mNumber: mNumber
            }

            const expectedResult = [
                {
                    type: "PlainCalculationPart",
                    value: mNumber
                }
            ]

            const result = numberCalculationPart(inputMock).getItems(undefined)

            expect(result).toEqual(expectedResult)
        })
    })
})
