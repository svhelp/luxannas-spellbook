import { describe, expect, it } from "@jest/globals";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { abilityResourceByCoefficientCalculationPart } from "../abilityResourceByCoefficientCalculationPart";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

describe("abilityResourceByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = abilityResourceByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("AbilityResourceByCoefficientCalculationPart")
    })

    it("Should use Total formula as default", () => {
        const inputMock: AbilityResourceByCoefficientCalculationPart = {
            __type: "AbilityResourceByCoefficientCalculationPart",
            mCoefficient: 1
        }
        
        const expectedResult = [
            {
                type: "StatCalculationPart",
                coefficient: 1,
                formula: ChampionStatFormula.Total,
                statName: "resourceMax"
            }
        ]

        const result = abilityResourceByCoefficientCalculationPart(inputMock).getItems(undefined)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 0.01, ChampionStatFormula.Base ],
            [ 0.5, ChampionStatFormula.Total ],
            [ 2, ChampionStatFormula.Bonus ],
        ])('mCoefficient: $mCoefficient, mStatFormula: $mStatFormula', (mCoefficient, mStatFormula) => {
            const inputMock: AbilityResourceByCoefficientCalculationPart = {
                __type: "AbilityResourceByCoefficientCalculationPart",
                mCoefficient,
                mStatFormula
            }
            
            const expectedResult = [
                {
                    type: "StatCalculationPart",
                    coefficient: mCoefficient,
                    formula: mStatFormula,
                    statName: "resourceMax"
                }
            ]
    
            const result = abilityResourceByCoefficientCalculationPart(inputMock).getItems(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
