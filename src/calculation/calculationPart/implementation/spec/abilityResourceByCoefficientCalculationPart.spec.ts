import "./mock";
import { describe, expect, it } from "@jest/globals";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { abilityResourceByCoefficientCalculationPart } from "../abilityResourceByCoefficientCalculationPart";
import { getStat } from "../utils";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { CalculationContext } from "domain/CalculationContext";
import { currentStatsMock, initStatsMock } from "./constants";

describe("abilityResourceByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = abilityResourceByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("AbilityResourceByCoefficientCalculationPart")
    })
    
    it("getStat should be called with input data", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 0.5,
            mStatFormula: ChampionStatFormula.Bonus
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        abilityResourceByCoefficientCalculationPart(inputMock).getValue(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "resourceMax", ChampionStatFormula.Bonus)
    })
    
    it("getStat should be called to obtain resource type", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 0.5,
            mStatFormula: ChampionStatFormula.Bonus
        }

        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: currentStatsMock,
            initStats: initStatsMock
        }

        abilityResourceByCoefficientCalculationPart(inputMock).getString(contextMock)

        expect(getStat).toBeCalledWith(contextMock, "resourceType")
    })

    describe("Should return value", () => {
        it.each([
            [ 0.25, 50 ],
            [ 0.5, 100 ],
        ])('mCoefficient: $mCoefficient', (mCoefficient, expectedResult) => {
            const inputMock: AbilityResourceByCoefficientCalculationPart = {
                __type: "AbilityResourceByCoefficientCalculationPart",
                mCoefficient,
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }
    
            const result = abilityResourceByCoefficientCalculationPart(inputMock).getValue(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
    
    describe("Should return string value", () => {
        it.each([
            [ 0.25, undefined, "25% @base@ @mana@" ],
            [ 0.5, ChampionStatFormula.Base, "50% @base@ @mana@" ],
            [ 0.5, ChampionStatFormula.Total, "50% @total@ @mana@" ],
        ])('mCoefficient: $mCoefficient, mStatFormula: $mStatFormula', (mCoefficient, mStatFormula, expectedResult) => {
            const inputMock: AbilityResourceByCoefficientCalculationPart = {
                __type: "AbilityResourceByCoefficientCalculationPart",
                mCoefficient,
                mStatFormula
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel: 1,
                
                currentStats: currentStatsMock,
                initStats: initStatsMock
            }
    
            const result = abilityResourceByCoefficientCalculationPart(inputMock).getString(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
