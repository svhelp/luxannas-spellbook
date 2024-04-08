import { describe, expect, it } from "@jest/globals";
import { gameplayCalculationPart } from "../gameplayCalculationPart";
import { CooldownMultiplierCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("gameplayCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = gameplayCalculationPart(inputMock).type

        expect(result).toEqual("GameplayCalculationPart")
    })

    it("Should return default value", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = gameplayCalculationPart(inputMock).getValue(undefined)

        expect(result).toEqual(1)
    })
    
    it("Should return empty string value", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = gameplayCalculationPart(inputMock).getString(undefined)

        expect(result).toEqual("")
    })
})
