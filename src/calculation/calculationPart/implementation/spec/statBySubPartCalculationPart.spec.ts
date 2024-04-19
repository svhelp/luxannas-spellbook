import './mock'
import { describe, expect, it, jest } from "@jest/globals";
import { statBySubPartCalculationPart } from "../statBySubPartCalculationPart";
import { StatBySubPartCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { CalculationContext } from "domain/CalculationContext";
import { baseStatsMock, currentStatsMock } from "./constants";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatName } from "../domain";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { CalculationPart } from "domain/CalculationPart";
import { calculateValueByParts } from "../utils";


describe("statBySubPartCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatBySubPartCalculationPart = {
            __type: "StatBySubPartCalculationPart",
            mSubpart: undefined
        }

        const result = statBySubPartCalculationPart(inputMock, undefined).type

        expect(result).toEqual("StatBySubPartCalculationPart")
    })

    it("Should use default values", () => {
        const inputMock: StatBySubPartCalculationPart = {
            __type: "StatBySubPartCalculationPart",
            mSubpart: undefined
        }

        const partItemMock: CalculationPartProvider = {
            type: "type_mock",
            getItems: (context: CalculationContext) => ([
                {
                    type: "PlainCalculationPart",
                    value: 1
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
                type: "StatCalculationPart",
                coefficient: 1,
                formula: ChampionStatFormula.Total,
                statName: ChampionStatName[ChampionStat.AbilityPower]
            }
        ]

        const result = statBySubPartCalculationPart(inputMock, partItemMock).getItems(contextMock)

        expect(result).toEqual(expectedResult)
    })

    it("Should use subpart with the current context co calculate coefficient", () => {
        const inputMock: StatBySubPartCalculationPart = {
            __type: "StatBySubPartCalculationPart",
            mSubpart: undefined
        }

        const subPartResult: CalculationPart[] = [
            {
                type: "PlainCalculationPart",
                value: 1337
            }
        ]
        
        const partItemMock: CalculationPartProvider = {
            type: "type_mock",
            getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(
                (context: CalculationContext) => subPartResult
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
                type: "StatCalculationPart",
                coefficient: 1337,
                formula: ChampionStatFormula.Total,
                statName: ChampionStatName[ChampionStat.AbilityPower]
            }
        ]

        const result = statBySubPartCalculationPart(inputMock, partItemMock).getItems(contextMock)

        expect(partItemMock.getItems).toBeCalledWith(contextMock)
        expect(calculateValueByParts).toBeCalledWith(contextMock, subPartResult)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ ChampionStat.AbilityHaste, ChampionStatFormula.Base, 2  ],
            [ ChampionStat.MaxHealth, ChampionStatFormula.Bonus, 1  ],
            [ ChampionStat.Armor, ChampionStatFormula.Total, 3  ],
        ])('mStat: $mStat, mStatFormula: $mStatFormula, subpartResultValue: $subpartResultValue', (mStat, mStatFormula, subpartResultValue) => {
            
            const inputMock: StatBySubPartCalculationPart = {
                __type: "StatBySubPartCalculationPart",
                mSubpart: undefined,
                mStat,
                mStatFormula
            }

            const subPartResult: CalculationPart[] = [
                {
                    type: "PlainCalculationPart",
                    value: subpartResultValue
                }
            ]
            
            const partItemMock: CalculationPartProvider = {
                type: "type_mock",
                getItems: (context: CalculationContext) => subPartResult
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: currentStatsMock,
                baseStats: baseStatsMock
            }
            
            const expectedResult = [
                {
                    type: "StatCalculationPart",
                    coefficient: subpartResultValue,
                    formula: mStatFormula,
                    statName: ChampionStatName[mStat]
                }
            ]
    
            const result = statBySubPartCalculationPart(inputMock, partItemMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
