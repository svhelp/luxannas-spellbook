import './mock'
import { describe, it, expect } from "@jest/globals";
import { inferFormulaByParts } from "../inferFormulaByParts";
import { buffPartsMock, complexPartsArrayMock, levelPartsMock, plainPartsMock, resourceStatPartMock, statPartsMock } from "./constants";
import { mergeCalculationParts } from '../mergeCalculationParts';

describe("inferFormulaByParts", () => {
    it("mergeCalculationParts should be called with initial data", () => {
        inferFormulaByParts(undefined, complexPartsArrayMock)

        expect(mergeCalculationParts).toBeCalledWith(complexPartsArrayMock)
    })

    it("Should infer plain formula", () => {
        const result = inferFormulaByParts(undefined, plainPartsMock)

        expect(result).toEqual("60")
    })

    it("Should infer buff formula", () => {
        const result = inferFormulaByParts(undefined, buffPartsMock)

        expect(result).toEqual("2000% @buff1@ + 3000% @buff2@")
    })

    it("Should infer resource type formula", () => {
        const result = inferFormulaByParts(undefined, resourceStatPartMock)

        expect(result).toEqual("100% @base@ @mana@")
    })

    it("Should infer stats formula", () => {
        const result = inferFormulaByParts(undefined, statPartsMock)

        expect(result).toEqual("200% @base@ @armor@ + 100% @base@ @abilityPower@ + 100% @bonus@ @armor@")
    })

    it("Should infer level formula", () => {
        const result = inferFormulaByParts(undefined, levelPartsMock)

        expect(result).toEqual("5 - 20 @level@")
    })

    it("Should infer complex formula", () => {
        const result = inferFormulaByParts(undefined, complexPartsArrayMock)

        expect(result).toEqual("60 + 5 - 20 @level@ + 200% @base@ @armor@ + 100% @base@ @abilityPower@ + 100% @bonus@ @armor@ + 2000% @buff1@ + 3000% @buff2@")
    })
})
