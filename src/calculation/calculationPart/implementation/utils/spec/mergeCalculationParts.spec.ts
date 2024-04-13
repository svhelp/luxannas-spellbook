import { describe, expect, it } from "@jest/globals";
import { mergeCalculationParts } from "../mergeCalculationParts";
import { plainPartsMock, mergedPlainParts, buffPartsMock, mergedBuffParts, statPartsMock, mergedStatParts, wrongLevelPartsMock, complexPartsArrayMock, mergedComplexPartsArray } from "./constants";

describe("mergeCalculationParts", () => {
    it("Should merge plain calculation parts", () => {
        const result = mergeCalculationParts(plainPartsMock)

        expect(result).toEqual(mergedPlainParts)
    })

    it("Should merge buff calculation parts", () => {
        const result = mergeCalculationParts(buffPartsMock)

        expect(result).toEqual(mergedBuffParts)
    })

    it("Should merge stat calculation parts", () => {
        const result = mergeCalculationParts(statPartsMock)

        expect(result).toEqual(mergedStatParts)
    })

    it("Should throw on merging several level calculation parts", () => {
        expect(() => mergeCalculationParts(wrongLevelPartsMock)).toThrow("Unable to merge a LevelCalculationPart type")
    })

    it("Should merge complex array", () => {
        const result = mergeCalculationParts(complexPartsArrayMock)

        expect(result).toEqual(mergedComplexPartsArray)
    })
})
