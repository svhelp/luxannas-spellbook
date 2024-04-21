import "./mock";
import { describe, expect, it } from "@jest/globals";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { buffCounterByNamedDataValueCalculationPart } from "../buffCounterByNamedDataValueCalculationPart";
import { spellMock } from "./constants";
import { getDataValue } from "../utils";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { dataValuesMock } from "./mock";

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

    describe("Should prioritize mIconKey over mBuffName", () => {
        it.each([
            [ 'BuffNameMock1', 'icon1' ],
            [ 'BuffNameMock2', undefined ],
            [ undefined, 'icon3' ],
        ])('mBuffName: $mBuffName, mIconKey: $mIconKey', (mBuffName, mIconKey) => {
            const inputMock: BuffCounterByNamedDataValueCalculationPart = {
                __type: "BuffCounterByNamedDataValueCalculationPart",
                mDataValue: "DataValueMock1",
                mBuffName,
                mIconKey
            }

            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: undefined,
                baseStats: undefined
            }
            
            const expectedResult = [
                {
                    type: "BuffCalculationPart",
                    coefficient: dataValuesMock["DataValueMock1"][1],
                    buff: mIconKey ?? mBuffName
                }
            ]
    
            const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })

    describe("Should return items", () => {
        it.each([
            [ 'DataValueMock3', 1, 'BuffNameMock1', 'icon1' ],
            [ 'DataValueMock3', 2, 'BuffNameMock2', undefined ],
            [ 'DataValueMock1', 2, 'BuffNameMock3', 'icon3' ],
        ])('mDataValue: $mDataValue, spellLevel: $spellLevel, mBuffName: $mBuffName, mIconKey: $mIconKey',
            (mDataValue, spellLevel, mBuffName, mIconKey) => {
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
                    baseStats: undefined
                }
            
                const expectedResult = [
                    {
                        type: "BuffCalculationPart",
                        coefficient: dataValuesMock[mDataValue][spellLevel],
                        buff: mIconKey ?? mBuffName
                    }
                ]
        
                const result = buffCounterByNamedDataValueCalculationPart(inputMock, spellMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
        })
    })
})
