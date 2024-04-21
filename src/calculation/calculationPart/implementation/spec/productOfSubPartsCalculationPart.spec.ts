import './mock'
import { describe, expect, it, jest } from "@jest/globals";
import { productOfSubPartsCalculationPart } from "../productOfSubPartsCalculationPart";
import { CalculationPart } from 'calculation/calculationPart/implementation/CalculationPart';
import { CalculationPartProvider } from 'calculation/calculationPart/CalculationPartProvider';
import { CalculationContext } from 'calculation/calculationPart/implementation/CalculationContext';
import { baseStatsMock, currentStatsMock } from './constants';
import { calculateValueByParts } from '../utils';

describe("productOfSubPartsCalculationPart", () => {
    it("Should return calculation part name", () => {
        const result = productOfSubPartsCalculationPart(undefined, undefined).type

        expect(result).toEqual("ProductOfSubPartsCalculationPart")
    })

    it("Should use subparts with the current context co calculate the result", () => {
        const subPart1Result: CalculationPart[] = [
            {
                type: "PlainCalculationPart",
                value: 3
            }
        ]
        
        const partItem1Mock: CalculationPartProvider = {
            type: "type_mock",
            getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
                (context: CalculationContext) => subPart1Result
            )
        }

        const subPart2Result: CalculationPart[] = [
            {
                type: "PlainCalculationPart",
                value: 9
            }
        ]
        
        const partItem2Mock: CalculationPartProvider = {
            type: "type_mock",
            getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
                (context: CalculationContext) => subPart2Result
            )
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            baseStats: baseStatsMock
        }

        const expectedResult = [
            {
                type: "PlainCalculationPart",
                value: 27
            }
        ]

        const result = productOfSubPartsCalculationPart(partItem1Mock, partItem2Mock).getItems(contextMock)

        expect(partItem1Mock.getItems).toBeCalledWith(contextMock)
        expect(partItem2Mock.getItems).toBeCalledWith(contextMock)
        expect(calculateValueByParts).toBeCalledWith(contextMock, subPart1Result)
        expect(calculateValueByParts).toBeCalledWith(contextMock, subPart2Result)

        expect(result).toEqual(expectedResult)
    })

    it("Should use default values", () => {
        const defaultProductItem: CalculationPart[] = [
            {
                type: "PlainCalculationPart",
                value: 1
            }
        ]
        
        const partItem1Mock: CalculationPartProvider = {
            type: "type_mock",
            getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
                (context: CalculationContext) => []
            )
        }
        
        const partItem2Mock: CalculationPartProvider = {
            type: "type_mock",
            getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
                (context: CalculationContext) => []
            )
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            baseStats: baseStatsMock
        }

        const expectedResult = [
            {
                type: "PlainCalculationPart",
                value: 1
            }
        ]

        const result = productOfSubPartsCalculationPart(partItem1Mock, partItem2Mock).getItems(contextMock)

        expect(calculateValueByParts).toBeCalledWith(contextMock, defaultProductItem)
        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 2, 7, 14 ],
            [ 1, 3, 3 ],
            [ 3, 12, 36 ],
        ])('subpart1ResultValue: $subpart1ResultValue, subpart2ResultValue: $subpart2ResultValue',
            (subpart1ResultValue, subpart2ResultValue, expectedResultValue) => {
           
                const part1ItemMock: CalculationPartProvider = {
                    type: "type_mock",
                    getItems: (context: CalculationContext) => ([
                        {
                            type: "PlainCalculationPart",
                            value: subpart1ResultValue
                        }
                    ])
                }
                
                const part2ItemMock: CalculationPartProvider = {
                    type: "type_mock",
                    getItems: (context: CalculationContext) => ([
                        {
                            type: "PlainCalculationPart",
                            value: subpart2ResultValue
                        }
                    ])
                }
                
                const contextMock: CalculationContext = {
                    championLevel: 1,
                    spellLevel: 1,
                    
                    currentStats: currentStatsMock,
                    baseStats: baseStatsMock
                }
                
                const expectedResult = [
                    {
                        type: "PlainCalculationPart",
                        value: expectedResultValue
                    }
                ]
        
                const result = productOfSubPartsCalculationPart(part1ItemMock, part2ItemMock).getItems(contextMock)
        
                expect(result).toEqual(expectedResult)
            }
        )
    })
})
