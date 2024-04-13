import { describe, expect, it } from "@jest/globals";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { statByCoefficientCalculationPart } from "../statByCoefficientCalculationPart";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatName } from "../domain";

describe("statByCoefficientCalculationPart", () => {
    it("Should return calculation part name", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart",
            mCoefficient: 1
        }

        const result = statByCoefficientCalculationPart(inputMock).type

        expect(result).toEqual("StatByCoefficientCalculationPart")
    })
    
    it("Should use default values", () => {
        const inputMock: StatByCoefficientCalculationPart = {
            __type: "StatByCoefficientCalculationPart"
        }

        const expectedResult = [
            {
                type: "StatCalculationPart",
                coefficient: 1,
                formula: ChampionStatFormula.Total,
                statName: ChampionStatName[ChampionStat.AbilityPower]
            }
        ]
        
        const result = statByCoefficientCalculationPart(inputMock).getItems(undefined)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ 0.01, ChampionStat.AbilityHaste, ChampionStatFormula.Base ],
            [ 0.5, ChampionStat.Armor, ChampionStatFormula.Total ],
            [ 2, ChampionStat.AttackSpeed, ChampionStatFormula.Bonus ],
        ])('mCoefficient: $mCoefficient, mStat: $mStat, mStatFormula: $mStatFormula', (mCoefficient, mStat, mStatFormula) => {
            const inputMock: StatByCoefficientCalculationPart = {
                __type: "StatByCoefficientCalculationPart",
                mCoefficient,
                mStat,
                mStatFormula
            }
            
            const expectedResult = [
                {
                    type: "StatCalculationPart",
                    coefficient: mCoefficient,
                    formula: mStatFormula,
                    statName: ChampionStatName[mStat]
                }
            ]
    
            const result = statByCoefficientCalculationPart(inputMock).getItems(undefined)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
