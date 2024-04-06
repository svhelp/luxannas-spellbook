import "./mock";
import { describe, expect, it } from "@jest/globals";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { statByCoefficientCalculationPart } from "../statByCoefficientCalculationPart";
import { currentStatsMock, initStatsMock } from "./constants";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { CalculationContext } from "domain/CalculationContext";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { getStat } from "../utils";

describe("statByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = statByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("StatByCoefficientCalculationPart")
    })
    
    it("getStat should be called with input data", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart",
            mCoefficient: 0.5,
            mStat: ChampionStat.AbilityHaste,
            mStatFormula: ChampionStatFormula.Bonus
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        statByCoefficientCalculationPart(inputMock).getValue(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "abilityHaste", ChampionStatFormula.Bonus)
    })
    
    it("Should use AP as default stat", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart",
            mCoefficient: 0.5,
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        statByCoefficientCalculationPart(inputMock).getValue(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "abilityPower", undefined)
    })

    describe("Should return value", () => {
        it.each([
            [ 0.25, undefined, 50 ],
            [ 0.5, ChampionStat.AbilityPower, 100 ],
            [ 0.5, ChampionStat.MaxHealth, 300 ],
        ])('mCoefficient: $mCoefficient, mStat: $mStat', (mCoefficient, mStat, expectedResult) => {
            const inputMock: StatByCoefficientCalculationPart = {
                __type: "StatByCoefficientCalculationPart",
                mCoefficient,
                mStat
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }
    
            const result = statByCoefficientCalculationPart(inputMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ 0.25, undefined, "25% @abilityPower@" ],
            [ 0.5, ChampionStat.AbilityPower, "50% @abilityPower@" ],
            [ 0.5, ChampionStat.MaxHealth, "50% @maxHealth@" ],
        ])('mCoefficient: $mCoefficient, mStat: $mStat', (mCoefficient, mStat, expectedResult) => {
            const inputMock: StatByCoefficientCalculationPart = {
                __type: "StatByCoefficientCalculationPart",
                mCoefficient,
                mStat
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }
    
            const result = statByCoefficientCalculationPart(inputMock).getString(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
