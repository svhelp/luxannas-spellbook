import "./mock";
import { describe, expect, it } from "@jest/globals";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { namedDataValueCalculationPart } from "../namedDataValueCalculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { spellMock } from "./constants";
import { getDataValue } from "../utils";

describe("namedDataValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: NamedDataValueCalculationPart = {
            __type: "NamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        const result = namedDataValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("NamedDataValueCalculationPart")
    })

    it("getDataValue should be called with input data", () => {
        const inputMock: NamedDataValueCalculationPart = {
            __type: "NamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        namedDataValueCalculationPart(inputMock, spellMock)

        expect(getDataValue).toBeCalledWith(spellMock, inputMock.mDataValue)
    })

    describe("Should return value", () => {
        it.each([
            [ "DataValueMock1", 2, 2 ],
            [ "DataValueMock1", 4, 4 ],
            [ "DataValueMock3", 2, .05 ],
        ])('dateValue: $dateValue, skillLevel: $skillLevel', (dateValue, skillLevel, expectedValue) => {
            const inputMock: NamedDataValueCalculationPart = {
                __type: "NamedDataValueCalculationPart",
                mDataValue: dateValue
            }

            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: skillLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = namedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)
    
            expect(result).toEqual(expectedValue)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ "DataValueMock1", 2, "2" ],
            [ "DataValueMock1", 4, "4" ],
            [ "DataValueMock3", 2, "0.05" ],
        ])('dateValue: $dateValue, skillLevel: $skillLevel', (dateValue, skillLevel, expectedValue) => {
            const inputMock: NamedDataValueCalculationPart = {
                __type: "NamedDataValueCalculationPart",
                mDataValue: dateValue
            }

            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: skillLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
    
            const result = namedDataValueCalculationPart(inputMock, spellMock).getString(contextMock)
    
            expect(result).toEqual(expectedValue)
        })
    })
})
