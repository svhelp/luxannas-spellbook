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

    describe("Should return value", () => {
        it.each([
            [ 0, 0 ],
            [ 1, 0 ]
        ])('mCoefficient: $mCoefficient', (mCoefficient, expectedResult) => {
            const inputMock: BuffCounterByCoefficientCalculationPart = {
                __type: "BuffCounterByCoefficientCalculationPart",
                mCoefficient,
                mBuffName: 'BuffNameMock'
            }
    
            const result = buffCounterByCoefficientCalculationPart(inputMock).getValue(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ .25, 'BuffNameMock1', 'icon1', "25% @icon1@" ],
            [ .5, 'BuffNameMock2', undefined, "50% @BuffNameMock2@" ],
            [ 2, 'BuffNameMock3', 'icon3', "200% @icon3@" ],
        ])('mCoefficient: $mCoefficient, mBuffName: $mBuffName, mIconKey: $mIconKey', (mCoefficient, mBuffName, mIconKey, expectedResult) => {
            const inputMock: BuffCounterByCoefficientCalculationPart = {
                __type: "BuffCounterByCoefficientCalculationPart",
                mCoefficient,
                mBuffName,
                mIconKey
            }
    
            const result = buffCounterByCoefficientCalculationPart(inputMock).getString(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
