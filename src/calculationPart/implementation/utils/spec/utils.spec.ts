import { describe, expect, it } from "@jest/globals"
import { getPercent } from "../getPercent"
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula"
import { CalculationContext } from "domain/CalculationContext"
import { ResourceType } from "domain/common/ResourceType"
import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { getStat } from "../getStat"

const initStatsMock: ChampionStats = {
    abilityHaste: 0,
    abilityPower: 200,

    attackDamage: 50,
    attackRange: 500,
    attackSpeed: 150,

    critChance: 0,
    critDamage: 100,

    maxHealth: 600,
    currentHealth: 600,
    healShieldPower: 0,
    healthRegenRate: 10,

    physicalLethality: 0,
    armor: 50,
    armorPenetrationFlat: 0,
    armorPenetrationPercent: 0,
    bonusArmorPenetrationPercent: 0,

    magicLethality: 0,
    magicResist: 50,
    magicPenetrationFlat: 0,
    magicPenetrationPercent: 0,
    bonusMagicPenetrationPercent: 0,

    lifeSteal: 0,
    physicalVamp: 0,
    spellVamp: 0,
    omnivamp: 0,

    resourceMax: 200,
    resourceRegenRate: 5,
    resourceType: ResourceType.Mana,
    resourceValue: 200,

    moveSpeed: 300,
    tenacity: 0,
}

const currentStatsMock: ChampionStats = {
    ...initStatsMock,
    attackDamage: 200,
    maxHealth: 1600,
}

const contextMock: CalculationContext = {
    championLevel: 1,
    spellLevel: 1,
    
    currentStats: currentStatsMock,
    initStats: initStatsMock,
}

describe("Calculation utils", () => {    
    describe("getPercent", () => {
        describe.each([
            [ 0.001, 0.1 ],
            [ 3, 300 ],
            [ 10, 10 ],
            [ 11, 11 ],
        ])("Should return x100 value if it is less than the provided threshold", (input, expectedOutput) => {
            it(`Should return ${expectedOutput} when provided with ${input} (threshold = 10)`, () => {
                const result = getPercent(input, 10)

                expect(result).toEqual(expectedOutput)
            })
        })

        describe.each([
            [ 0.001, 0.1 ],
            [ 0.1, 0.1 ],
            [ 3, 3 ]
        ])("Should use the default threshould equal to 0.01", (input, expectedOutput) => {
            it(`Should return ${expectedOutput} when provided with ${input}`, () => {
                const result = getPercent(input)

                expect(result).toEqual(expectedOutput)
            })
        })
    })
    
    describe.each([
        [ "undefined", undefined, 600 ],
        [ "Base", ChampionStatFormula.Base, 600 ],
        [ "Bonus", ChampionStatFormula.Bonus, 1000 ],
        [ "Total", ChampionStatFormula.Total, 1600 ],
    ])("getStat should extract stats according to the provided formula", (formulaDescription, formula, expectedOutput) => {
        it(`${formulaDescription} formula`, () => {
            const result = getStat(contextMock, "maxHealth", formula)

            expect(result).toEqual(expectedOutput)
        })
    })
})