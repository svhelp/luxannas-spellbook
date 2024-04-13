import "./mock";
import { describe, expect, it } from "@jest/globals";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { namedDataValueCalculationPart } from "../namedDataValueCalculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { spellMock } from "./constants";
import { getDataValue } from "../utils";
import { dataValuesMock } from "./mock";

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

    describe("Should return items", () => {
        it.each([
            [ "DataValueMock1", 2 ],
            [ "DataValueMock1", 4 ],
            [ "DataValueMock3", 2 ],
        ])('mDataValue: $mDataValue, spellLevel: $spellLevel', (mDataValue, spellLevel) => {
            const inputMock: NamedDataValueCalculationPart = {
                __type: "NamedDataValueCalculationPart",
                mDataValue
            }
    
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: spellLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
        
            const expectedResult = [
                {
                    type: "PlainCalculationPart",
                    value: dataValuesMock[mDataValue][spellLevel]
                }
            ]
    
            const result = namedDataValueCalculationPart(inputMock, spellMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
