import './mock'
import { describe, expect, it, jest } from "@jest/globals";
import { sumOfSubPartsCalculationPart } from "../sumOfSubPartsCalculationPart";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { baseStatsMock, currentStatsMock } from "./constants";
import { mergeCalculationParts } from '../utils';

describe("sumOfSubPartsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const result = sumOfSubPartsCalculationPart([]).type

        expect(result).toEqual("SumOfSubPartsCalculationPart")
    })

    it("Should use subparts with the current context co calculate the result", () => {
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

        const expectedResult = [{
            type: "PlainCalculationPart",
            value: 23
        }]

        const result = sumOfSubPartsCalculationPart(partItemsMock).getItems(contextMock)

        for (const partItemMock of partItemsMock) {
            expect(partItemMock.getItems).toBeCalledWith(contextMock)
        }
        
        expect(mergeCalculationParts).toBeCalledWith(partItemResultsMock)
        expect(result).toEqual(expectedResult)
    })
})
