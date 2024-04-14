import { describe, expect, it } from "@jest/globals"
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula"
import { CalculationContext } from "domain/CalculationContext"
import { ResourceType } from "domain/common/ResourceType"
import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { getStat } from "../getStat"

const initStatsMock: ChampionStats = {
    abilityHaste: 0,
    abilityPower: 200,
    cooldownReduction: 0,

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
    baseStats: initStatsMock,
}

describe("getStat", () => {    
    describe.each([
        [ "undefined", undefined, 600 ],
        [ "Base", ChampionStatFormula.Base, 600 ],
        [ "Bonus", ChampionStatFormula.Bonus, 1000 ],
        [ "Total", ChampionStatFormula.Total, 1600 ],
    ])("Should extract stats according to the provided formula", (formulaDescription, formula, expectedOutput) => {
        it(`${formulaDescription} formula`, () => {
            const result = getStat(contextMock, "maxHealth", formula)

            expect(result).toEqual(expectedOutput)
        })
    })
})
