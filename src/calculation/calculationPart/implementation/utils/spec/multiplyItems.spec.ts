import "./mock"
import { describe, expect, it } from "@jest/globals";
import { complexPartsArrayMock, mergedComplexPartsArray, partsMultipliedBy2, partsMultipliedBy10 } from "./constants";
import { multiplyItems } from "../multiplyItems";
import { mergeCalculationParts } from "../mergeCalculationParts";

describe("multiplyItems", () => {
    it("Should merge input items", () => {
        multiplyItems(complexPartsArrayMock)

        expect(mergeCalculationParts).toBeCalledWith(complexPartsArrayMock)
    })

    describe("Should multiply items", () => {
        it.each([
            [ 2, partsMultipliedBy2 ],
            [ 10, partsMultipliedBy10 ],
        ])("multiplier: $multiplier", (multiplier, expectedResult) => {
            const result = multiplyItems(complexPartsArrayMock, multiplier)

            expect(result).toEqual(expectedResult)
        })
    })

    it("Should use default multiplier", () => {
        const result = multiplyItems(complexPartsArrayMock)

        expect(result).toEqual(mergedComplexPartsArray)
    })

    it("Should throw on unsupported item type", () => {
        const mockInputData = [
            {
                type: "UnknownPartType",
                value: 1
            }
        ]

        expect(() => multiplyItems(mockInputData as any)).toThrow("Unsupported calculation part")
    })
})
