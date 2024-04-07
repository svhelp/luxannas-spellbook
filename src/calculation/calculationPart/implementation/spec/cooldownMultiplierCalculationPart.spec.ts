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

    it("Should return default value", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = cooldownMultiplierCalculationPart(inputMock).getValue(undefined)

        expect(result).toEqual(1)
    })
    
    it("Should return empty string value", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = cooldownMultiplierCalculationPart(inputMock).getString(undefined)

        expect(result).toEqual("")
    })
})
