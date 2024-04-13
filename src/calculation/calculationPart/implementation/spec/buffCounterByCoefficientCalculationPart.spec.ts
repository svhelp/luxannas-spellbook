import { describe, expect, it } from "@jest/globals";
import { buffCounterByCoefficientCalculationPart } from "../buffCounterByCoefficientCalculationPart";
import { BuffCounterByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";

describe("buffCounterByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: BuffCounterByCoefficientCalculationPart = {
            __type: "BuffCounterByCoefficientCalculationPart",
            mCoefficient: 1,
            mBuffName: 'BuffNameMock'
        }

        const result = buffCounterByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("BuffCounterByCoefficientCalculationPart")
    })
    
    describe("Should prioritize mIconKey over mBuffName", () => {
        it.each([
            [ 'BuffNameMock1', 'icon1' ],
            [ 'BuffNameMock2', undefined ],
            [ undefined, 'icon3' ],
        ])('mBuffName: $mBuffName, mIconKey: $mIconKey', (mBuffName, mIconKey) => {
            const inputMock: BuffCounterByCoefficientCalculationPart = {
                __type: "BuffCounterByCoefficientCalculationPart",
                mCoefficient: 1,
                mBuffName,
                mIconKey
            }
            
            const expectedResult = [
                {
                    type: "BuffCalculationPart",
                    coefficient: 1,
                    buff: mIconKey ?? mBuffName
                }
            ]
    
            const result = buffCounterByCoefficientCalculationPart(inputMock).getItems(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })

    describe("Should return items", () => {
        it.each([
            [ .25, 'icon1' ],
            [ .5, 'icon2' ],
            [ 2, 'icon3' ],
        ])('mCoefficient: $mCoefficient, mIconKey: $mIconKey', (mCoefficient, mIconKey) => {
            const inputMock: BuffCounterByCoefficientCalculationPart = {
                __type: "BuffCounterByCoefficientCalculationPart",
                mCoefficient,
                mBuffName: 'BuffNameMock',
                mIconKey
            }
            
            const expectedResult = [
                {
                    type: "BuffCalculationPart",
                    coefficient: mCoefficient,
                    buff: mIconKey
                }
            ]
    
            const result = buffCounterByCoefficientCalculationPart(inputMock).getItems(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
