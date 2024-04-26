import './mock'
import { describe, it, expect } from "@jest/globals";
import { calculateValueByParts } from "../calculateValueByParts";
import { buffPartsMock, complexPartsArrayMock, levelPartsMock, plainPartsMock, statPartsMock } from "./constants";
import { mergeCalculationParts } from '../mergeCalculationParts';
import { CalculationContext } from 'calculation/calculationPart/implementation/CalculationContext';
import { getStat } from '../getStat';
import { ChampionStatFormula } from 'domain/jsonSchema/ChampionStatFormula';

describe("calculateValueByParts", () => {
    it("mergeCalculationParts should be called with initial data", () => {
        calculateValueByParts(undefined, complexPartsArrayMock)

        expect(mergeCalculationParts).toBeCalledWith(complexPartsArrayMock)
    })

    it("Should calculate plain parts", () => {
        const result = calculateValueByParts(undefined, plainPartsMock)

        expect(result).toEqual(60)
    })

    it("Should calculate buff parts", () => {
        const result = calculateValueByParts(undefined, buffPartsMock)

        expect(result).toEqual(0)
    })

    it("getStat should be called with corresponding stats", () => {
        const contextMock: CalculationContext = {
            championLevel: 1,
            spellLevel: 1,
            
            currentStats: undefined,
            baseStats: undefined
        }

        calculateValueByParts(contextMock, statPartsMock)

        expect(getStat).toBeCalledWith(contextMock, "armor", ChampionStatFormula.Base)
        expect(getStat).toBeCalledWith(contextMock, "abilityPower", ChampionStatFormula.Base)
        expect(getStat).toBeCalledWith(contextMock, "armor", ChampionStatFormula.Bonus)
    })

    it("Should calculate stat parts", () => {
        const result = calculateValueByParts(undefined, statPartsMock)

        expect(result).toEqual(130)
    })

    it("Should calculate level parts", () => {
        const result = calculateValueByParts(undefined, levelPartsMock)

        expect(result).toEqual(10)
    })

    it("Should calculate complex parts", () => {
        const result = calculateValueByParts(undefined, complexPartsArrayMock)

        expect(result).toEqual(200)
    })
})
