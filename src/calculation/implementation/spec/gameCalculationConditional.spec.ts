import { describe, expect, it } from "@jest/globals";
import { GameCalculationConditional } from "domain/jsonSchema/SpellCalculation";
import { gameCalculationConditional } from "../gameCalculationConditional";
import { namedDataValueCalculationItemMock, numberCalculationItemMock, plainResultsMock, spellMock } from "./constants";

describe("gameCalculationConditional", () => {
    it("Should return calculation type", () => {
        const calculationMock: GameCalculationConditional = {
            __type: "GameCalculationConditional",
            mDefaultGameCalculation: "calculation name mock 1",
            mConditionalGameCalculation: "calculation name mock 2",
            '{c0482365}': {
                __type: 'HasBuffCastRequirement',
                mBuffName: "buff name mock"
            }
        }

        const calculation = gameCalculationConditional(spellMock, calculationMock, "")

        expect(calculation.type).toEqual("GameCalculationConditional")
    })

    it("Should return items", () => {
        const calculationMock: GameCalculationConditional = {
            __type: "GameCalculationConditional",
            mDefaultGameCalculation: "result1",
            mConditionalGameCalculation: "calculation name mock 2",
            '{c0482365}': {
                __type: 'HasBuffCastRequirement',
                mBuffName: "buff name mock"
            }
        }

        const calculation = gameCalculationConditional(spellMock, calculationMock, "")
        const result = calculation.getItems(undefined, plainResultsMock)

        expect(result).toEqual([
            numberCalculationItemMock, 
            namedDataValueCalculationItemMock,
        ])
    })

    it("Should return on items not found", () => {
        const calculationMock: GameCalculationConditional = {
            __type: "GameCalculationConditional",
            mDefaultGameCalculation: "result1",
            mConditionalGameCalculation: "calculation name mock 2",
            '{c0482365}': {
                __type: 'HasBuffCastRequirement',
                mBuffName: "buff name mock"
            }
        }

        const calculation = gameCalculationConditional(spellMock, calculationMock, "")

        expect(() => calculation.getItems(undefined, [])).toThrow("Calculation to modify not found")
    })

    it("Should return alternative items", () => {
        const calculationMock: GameCalculationConditional = {
            __type: "GameCalculationConditional",
            mDefaultGameCalculation: "calculation name mock 1",
            mConditionalGameCalculation: "result1",
            '{c0482365}': {
                __type: 'HasBuffCastRequirement',
                mBuffName: "buff name mock"
            }
        }

        const calculation = gameCalculationConditional(spellMock, calculationMock, "")
        const result = calculation.getAltItems(undefined, plainResultsMock)

        expect(result).toEqual([
            numberCalculationItemMock, 
            namedDataValueCalculationItemMock,
        ])
    })

    it("Should return on alternative items not found", () => {
        const calculationMock: GameCalculationConditional = {
            __type: "GameCalculationConditional",
            mDefaultGameCalculation: "calculation name mock 1",
            mConditionalGameCalculation: "result1",
            '{c0482365}': {
                __type: 'HasBuffCastRequirement',
                mBuffName: "buff name mock"
            }
        }

        const calculation = gameCalculationConditional(spellMock, calculationMock, "")

        expect(() => calculation.getItems(undefined, [])).toThrow("Calculation to modify not found")
    })
})