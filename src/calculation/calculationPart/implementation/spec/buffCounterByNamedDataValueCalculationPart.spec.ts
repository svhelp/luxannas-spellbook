import "./mock";
import { describe, expect, it } from "@jest/globals";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { buffCounterByNamedDataValueCalculationPart } from "../buffCounterByNamedDataValueCalculationPart";
import { spellMock } from "./constants";
import { getDataValue } from "../utils";
import { CalculationContext } from "domain/CalculationContext";

describe("buffCounterByNamedDataValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: BuffCounterByNamedDataValueCalculationPart = {
            __type: "BuffCounterByNamedDataValueCalculationPart",
            mBuffName: 'BuffNameMock',
            mDataValue: 'DataValueMock1'
        }

        const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("BuffCounterByNamedDataValueCalculationPart")
    })

    it("getDataValue should be called with input data", () => {
        const inputMock: BuffCounterByNamedDataValueCalculationPart = {
            __type: "BuffCounterByNamedDataValueCalculationPart",
            mBuffName: 'BuffNameMock',
            mDataValue: 'DataValueMock1'
        }

        buffCounterByNamedDataValueCalculationPart(inputMock, spellMock)

        expect(getDataValue).toBeCalledWith(spellMock, inputMock.mDataValue)
    })

    describe("Should return value", () => {
        it.each([
            [ 'DataValueMock1', 1, 0 ],
            [ 'DataValueMock1', 2, 0 ],
            [ 'DataValueMock2', 2, 0 ],
        ])('mDataValue: $mDataValue, spellLevel: $spellLevel', (mDataValue, spellLevel, expectedResult) => {
            const inputMock: BuffCounterByNamedDataValueCalculationPart = {
                __type: "BuffCounterByNamedDataValueCalculationPart",
                mDataValue,
                mBuffName: 'BuffNameMock'
            }
    
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: spellLevel,
                
                currentStats: undefined,
                initStats: undefined
            }
            
            const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ 'DataValueMock3', 1, 'BuffNameMock1', 'icon1', "1% @icon1@" ],
            [ 'DataValueMock3', 2, 'BuffNameMock2', undefined, "5% @BuffNameMock2@" ],
            [ 'DataValueMock1', 2, 'BuffNameMock3', 'icon3', "200% @icon3@" ],
        ])('mDataValue: $mDataValue, spellLevel: $spellLevel, mBuffName: $mBuffName, mIconKey: $mIconKey',
            (mDataValue, spellLevel, mBuffName, mIconKey, expectedResult) => {
                const inputMock: BuffCounterByNamedDataValueCalculationPart = {
                    __type: "BuffCounterByNamedDataValueCalculationPart",
                    mDataValue,
                    mBuffName,
                    mIconKey
                }
        
                const contextMock: CalculationContext = {
                    championLevel: 1,
                    spellLevel: spellLevel,
                    
                    currentStats: undefined,
                    initStats: undefined
                }
        
                const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).getString(contextMock)
        
                expect(result).toEqual(expectedResult)
            })
    })
})
