import './mock'
import { describe, expect, it, jest } from "@jest/globals";
import { clampBySubpartCalculationPart } from "../clampBySubpartCalculationPart";
import { ClampBySubpartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { baseStatsMock, currentStatsMock } from "./constants";
import { calculateValueByParts } from '../utils';

const partItemResultsMock: CalculationPart[] = [23, 3, 19].map(value => ({
    type: "PlainCalculationPart",
    value
}))

const partItemsMock: CalculationPartProvider[] = partItemResultsMock.map(result => ({
        type: "type_mock",
        getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
            (context: CalculationContext) => [ result ]
        )
    })
)

const contextMock: CalculationContext = {
    championLevel: 1,
    spellLevel: 1,
    
    currentStats: currentStatsMock,
    baseStats: baseStatsMock
}

describe("clampBySubpartCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: ClampBySubpartCalculationPart = {
            __type: "{803dae4c}",
            mCeiling: 0,
            mFloor: 10,
            mSubparts: []
        }

        const result = clampBySubpartCalculationPart(inputMock, []).type

        expect(result).toEqual("ClampBySubpartCalculationPart")
    })

    it("Should not clamp if thresholds weren't provided", () => {
        const inputMock: ClampBySubpartCalculationPart = {
            __type: "{803dae4c}",
            mCeiling: null,
            mFloor: null,
            mSubparts: []
        }

        const expectedResult = [
            {
                type: "PlainCalculationPart",
                value: 23
            }
        ]

        const result = clampBySubpartCalculationPart(inputMock, partItemsMock).getItems(contextMock)

        expect(result).toEqual(expectedResult)
    })

    it("Should use subparts with the current context co calculate the result", () => {
        const inputMock: ClampBySubpartCalculationPart = {
            __type: "{803dae4c}",
            mCeiling: null,
            mFloor: null,
            mSubparts: []
        }

        clampBySubpartCalculationPart(inputMock, partItemsMock).getItems(contextMock)

        for (const partItemMock of partItemsMock) {
            expect(partItemMock.getItems).toBeCalledWith(contextMock)
        }
        
        expect(calculateValueByParts).toBeCalledWith(contextMock, partItemResultsMock)
    })

    describe("Should return items", () => {
        it.each([
            [ 2, 7, 7 ],
            [ 30, 100, 30 ],
            [ 3, 30, 23 ],
        ])('mFloor: $mFloor, mCeiling: $mCeiling', (mFloor, mCeiling, expectedResultValue) => {
            const inputMock: ClampBySubpartCalculationPart = {
                __type: "{803dae4c}",
                mCeiling,
                mFloor,
                mSubparts: []
            }
    
            const expectedResult = [
                {
                    type: "PlainCalculationPart",
                    value: expectedResultValue
                }
            ]
    
            const result = clampBySubpartCalculationPart(inputMock, partItemsMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
