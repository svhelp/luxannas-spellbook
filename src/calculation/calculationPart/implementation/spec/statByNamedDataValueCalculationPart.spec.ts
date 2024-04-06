import "./mock";
import { describe, expect, it } from "@jest/globals";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { statByNamedDataValueCalculationPart } from "../statByNamedDataValueCalculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { currentStatsMock, initStatsMock, spellMock } from "./constants";
import { getDataValue, getStat } from "../utils";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

describe("statByNamedDataValueCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatByNamedDataValueCalculationPart = {
            __type: "StatByNamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        const result = statByNamedDataValueCalculationPart(inputMock, spellMock).type

        expect(result).toEqual("StatByNamedDataValueCalculationPart")
    })
    
    it("getDataValue should be called with input data", () => {
        const inputMock: StatByNamedDataValueCalculationPart = {
            __type: "StatByNamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        statByNamedDataValueCalculationPart(inputMock, spellMock)

        expect(getDataValue).toBeCalledWith(spellMock, inputMock.mDataValue)
    })
    
    it("getStat should be called with input data", () => {
        const inputMock: StatByNamedDataValueCalculationPart = {
            __type: "StatByNamedDataValueCalculationPart",
            mDataValue: "DataValueMock1",
            mStat: ChampionStat.AbilityHaste,
            mStatFormula: ChampionStatFormula.Bonus
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        statByNamedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "abilityHaste", ChampionStatFormula.Bonus)
    })
    
    it("Should use AP as default stat", () => {
        const inputMock: StatByNamedDataValueCalculationPart = {
            __type: "StatByNamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        statByNamedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "abilityPower", undefined)
    })

    describe("Should return value", () => {
        it.each([
            [ "DataValueMock1", ChampionStat.AbilityPower, 2, 400  ],
            [ "DataValueMock3", ChampionStat.MaxHealth, 1, 6  ],
            [ "DataValueMock3", undefined, 3, 20  ],
        ])('mDataValue: $mDataValue, mStat: $mStat, spellLevel: $spellLevel', (mDataValue, mStat, spellLevel, expectedResult) => {
            const inputMock: StatByNamedDataValueCalculationPart = {
                __type: "StatByNamedDataValueCalculationPart",
                mDataValue,
                mStat
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: spellLevel,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }
    
            const result = statByNamedDataValueCalculationPart(inputMock, spellMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ "DataValueMock1", ChampionStat.AbilityPower, 2, "200% @abilityPower@"  ],
            [ "DataValueMock3", ChampionStat.MaxHealth, 1, "1% @maxHealth@"  ],
            [ "DataValueMock3", undefined, 3, "10% @abilityPower@"  ],
        ])('mDataValue: $mDataValue, mStat: $mStat, spellLevel: $spellLevel', (mDataValue, mStat, spellLevel, expectedResult) => {
            const inputMock: StatByNamedDataValueCalculationPart = {
                __type: "StatByNamedDataValueCalculationPart",
                mDataValue,
                mStat
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: spellLevel,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }

            const result = statByNamedDataValueCalculationPart(inputMock, spellMock).getString(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
