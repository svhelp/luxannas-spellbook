import "./mock"
import { describe, expect, it } from "@jest/globals";
import { GameCalculationModified } from "domain/jsonSchema/SpellCalculation";
import { gameCalculationModified } from "../gameCalculationModified";
import { contextMock, defaultMultiplierDataMock, multipliedPartItemsMock, multiplierDataMock, multiplierItemMock, multiplierPartMock, namedDataValueCalculationItemMock, nonCountableMultiplierDataMock, numberCalculationItemMock, plainResultsMock, spellMock } from "./constants";
import { parseCalculationPart } from "../../calculationPart";
import { calculateValueByParts, multiplyItems } from "../../calculationPart/implementation/utils";

describe("gameCalculationModified", () => {
    it("Should return calculation type", () => {
        const calculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "calculation name mock",
            mMultiplier: multiplierDataMock
        }

        const calculation = gameCalculationModified(spellMock, calculationMock, "")

        expect(calculation.type).toEqual("GameCalculationModified")
    })

    it("Should parse multiplier", () => {
        const calculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "calculation name mock",
            mMultiplier: multiplierDataMock
        }

        gameCalculationModified(spellMock, calculationMock, "")

        expect(parseCalculationPart).toBeCalledWith(spellMock, multiplierDataMock, "")
    })

    it("Should use default multiplier if none presented", () => {
        const noMultiplierCalculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "calculation name mock",
            mMultiplier: undefined
        }

        gameCalculationModified(spellMock, noMultiplierCalculationMock, "")

        expect(parseCalculationPart).toBeCalledWith(spellMock, defaultMultiplierDataMock, "")
    })

    it("Should throw in case target modified not found", () => {
        const noMultiplierCalculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "calculation name mock",
            mMultiplier: multiplierDataMock
        }

        const calculation = gameCalculationModified(spellMock, noMultiplierCalculationMock, "")

        expect(() => calculation.getItems(contextMock, [])).toThrow("Calculation to modify not found")
    })
    
    it("Should return multiplied items", () => {
        const calculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "result1",
            mMultiplier: multiplierDataMock
        }
        
        const calculation = gameCalculationModified(spellMock, calculationMock, "")
        const result = calculation.getItems(contextMock, plainResultsMock)

        expect(multiplierPartMock.getItems).toBeCalledWith(contextMock)

        expect(calculateValueByParts).toBeCalledWith(contextMock, [ multiplierItemMock ])
        expect(multiplyItems).toBeCalledWith([ numberCalculationItemMock, namedDataValueCalculationItemMock ], 5)

        expect(result).toEqual(multipliedPartItemsMock)
    })

    it("Should use default multiplier if the presented data returns no items", () => {
        const calculationMock: GameCalculationModified = {
            __type: "GameCalculationModified",
            mModifiedGameCalculation: "result1",
            mMultiplier: nonCountableMultiplierDataMock
        }
        
        const calculation = gameCalculationModified(spellMock, calculationMock, "")
        const result = calculation.getItems(contextMock, plainResultsMock)

        expect(multiplyItems).toBeCalledWith([ numberCalculationItemMock, namedDataValueCalculationItemMock ], 1)

        expect(result).toEqual([ numberCalculationItemMock, namedDataValueCalculationItemMock ])
    })
})