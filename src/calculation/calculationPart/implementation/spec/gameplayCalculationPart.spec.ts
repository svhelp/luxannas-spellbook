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

    it("Should return empty items", () => {
        const inputMock: CooldownMultiplierCalculationPart = {
            __type: "CooldownMultiplierCalculationPart",
        }

        const result = gameplayCalculationPart(inputMock).getItems(undefined)

        expect(result).toEqual([])
    })
})
