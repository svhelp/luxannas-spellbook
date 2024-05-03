import "./mock"
import { describe, expect, it } from "@jest/globals";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { gameCalculation } from "../gameCalculation";
import {
    partItemsMock,
    multiplierDataMock,
    spellMock,
    defaultMultiplierDataMock,
    contextMock,
    numberCalculationPartMock,
    namedDataValueCalculationPartMock,
    multiplierPartMock,
    multipliedPartItemsMock,
    multiplierItemMock,
    numberCalculationItemMock, 
    namedDataValueCalculationItemMock,
    nonCountableMultiplierDataMock
} from "./constants";
import { parseCalculationPart } from "calculation/calculationPart";
import { calculateValueByParts, multiplyItems } from "calculation/calculationPart/implementation/utils";


describe("gameCalculation", () => {
    it("Should return calculation type", () => {
        const calculationMock: GameCalculation = {
            __type: "GameCalculation",
            mFormulaParts: partItemsMock,
            mMultiplier: multiplierDataMock
        }

        const calculation = gameCalculation(spellMock, calculationMock, "")

        expect(calculation.type).toEqual("GameCalculation")
    })

    it("Should parse calculationParts and multiplier", () => {
        const calculationMock: GameCalculation = {
            __type: "GameCalculation",
            mFormulaParts: partItemsMock,
            mMultiplier: multiplierDataMock
        }

        gameCalculation(spellMock, calculationMock, "")

        expect(parseCalculationPart).toBeCalledWith(spellMock, multiplierDataMock, "")

        for (const partMock of partItemsMock) {
            expect(parseCalculationPart).toBeCalledWith(spellMock, partMock, "")
        }
    })

    it("Should use default multiplier if none presented", () => {
        const noMultiplierCalculationMock: GameCalculation = {
            __type: "GameCalculation",
            mFormulaParts: partItemsMock,
        }

        gameCalculation(spellMock, noMultiplierCalculationMock, "")

        expect(parseCalculationPart).toBeCalledWith(spellMock, defaultMultiplierDataMock, "")
    })

    it("Should return multiplied items", () => {
        const calculationMock: GameCalculation = {
            __type: "GameCalculation",
            mFormulaParts: partItemsMock,
            mMultiplier: multiplierDataMock
        }
        
        const calculation = gameCalculation(spellMock, calculationMock, "")
        const result = calculation.getItems(contextMock)

        expect(numberCalculationPartMock.getItems).toBeCalledWith(contextMock)
        expect(namedDataValueCalculationPartMock.getItems).toBeCalledWith(contextMock)
        expect(multiplierPartMock.getItems).toBeCalledWith(contextMock)

        expect(calculateValueByParts).toBeCalledWith(contextMock, [ multiplierItemMock ])
        expect(multiplyItems).toBeCalledWith([ numberCalculationItemMock, namedDataValueCalculationItemMock ], 5)

        expect(result).toEqual(multipliedPartItemsMock)
    })

    it("Should use default multiplier if the presented data returns no items", () => {
        const calculationMock: GameCalculation = {
            __type: "GameCalculation",
            mFormulaParts: partItemsMock,
            mMultiplier: nonCountableMultiplierDataMock
        }
        
        const calculation = gameCalculation(spellMock, calculationMock, "")
        const result = calculation.getItems(contextMock)

        expect(multiplyItems).toBeCalledWith([ numberCalculationItemMock, namedDataValueCalculationItemMock ], 1)

        expect(result).toEqual([ numberCalculationItemMock, namedDataValueCalculationItemMock ])
    })
})
