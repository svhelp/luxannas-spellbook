import "./mock";
import { describe, expect, it } from "@jest/globals";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { statByNamedDataValueCalculationPart } from "../statByNamedDataValueCalculationPart";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { currentStatsMock, baseStatsMock, spellMock } from "./constants";
import { getDataValue } from "../utils";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatName } from "../domain";
import { dataValuesMock } from "./mock";

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
    
    it("Should use default values", () => {
        const inputMock: StatByNamedDataValueCalculationPart = {
            __type: "StatByNamedDataValueCalculationPart",
            mDataValue: "DataValueMock1"
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
                coefficient: dataValuesMock["DataValueMock1"][1],
                formula: ChampionStatFormula.Total,
                statName: ChampionStatName[ChampionStat.AbilityPower]
            }
        ]

        const result = statByNamedDataValueCalculationPart(inputMock, spellMock).getItems(contextMock)

        expect(result).toEqual(expectedResult)
    })

    describe("Should return items", () => {
        it.each([
            [ "DataValueMock1", ChampionStat.AbilityHaste, ChampionStatFormula.Base, 2  ],
            [ "DataValueMock3", ChampionStat.MaxHealth, ChampionStatFormula.Bonus, 1  ],
            [ "DataValueMock3", ChampionStat.Armor, ChampionStatFormula.Total, 3  ],
        ])('mDataValue: $mDataValue, mStat: $mStat, mStatFormula: $mStatFormula, spellLevel: $spellLevel', (mDataValue, mStat, mStatFormula, spellLevel) => {
            const inputMock: StatByNamedDataValueCalculationPart = {
                __type: "StatByNamedDataValueCalculationPart",
                mDataValue,
                mStat,
                mStatFormula
            }
            
            const contextMock: CalculationContext = {
                championLevel: 1,
                spellLevel,
                
                currentStats: currentStatsMock,
                baseStats: baseStatsMock
            }
            
            const expectedResult = [
                {
                    type: "StatCalculationPart",
                    coefficient: dataValuesMock[mDataValue][spellLevel],
                    formula: mStatFormula,
                    statName: ChampionStatName[mStat]
                }
            ]
    
            const result = statByNamedDataValueCalculationPart(inputMock, spellMock).getItems(contextMock)
    
            expect(result).toEqual(expectedResult)
        })
    })
})
