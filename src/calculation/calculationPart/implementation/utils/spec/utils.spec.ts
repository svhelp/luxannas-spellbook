import { describe, expect, it } from "@jest/globals"
import { getPercent } from "../getPercent"
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula"
import { CalculationContext } from "domain/CalculationContext"
import { ResourceType } from "domain/common/ResourceType"
import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { getStat } from "../getStat"
import { getDataValue } from "../getDataValue"
import { Spell } from "domain/jsonSchema/SpellData"

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

const dataValues1Mock = [ 0, 1, 2, 3, 4, 5 ]
const dataValues2Mock = [ 6, 7, 8, 9, 10, 11 ]
const dataValues3Mock = [ 0, .01, .05, .1, .2, .5]

const spellMock: Spell = {
    mClientData: undefined,
    mDataValues: [
        {
            mName: "DataValueMock1",
            mValues: dataValues1Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock2",
            mValues: dataValues2Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock3",
            mHashedName: "hashed_name_mock",
            mValues: dataValues3Mock,
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock4",
            __type: "SpellDataValue"
        },
    ],
    __type: "SpellDataResource"
}

describe("Calculation utils", () => {    
    describe("getPercent", () => {
        describe.each([
            [ 0.001, "0.1%" ],
            [ 3, "300%" ],
            [ 10, "10" ],
            [ 11, "11" ],
        ])("Should return x100 value if it is less than the provided threshold", (input, expectedOutput) => {
            it(`Should return ${expectedOutput} when provided with ${input} (threshold = 10)`, () => {
                const result = getPercent(input, 10)

                expect(result).toEqual(expectedOutput)
            })
        })

        describe.each([
            [ 0.001, "0.1%" ],
            [ 0.1, "0.1" ],
            [ 3, "3" ]
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
    
    describe("getDataValue", () => {
        it ('Should extract by plain name', () => {
            const result = getDataValue(spellMock, "DataValueMock2")
            
            expect(result).toEqual(dataValues2Mock)
        })

        it ('Should extract by plain name with another casing', () => {
            const result = getDataValue(spellMock, "datavaluemock1")
            
            expect(result).toEqual(dataValues1Mock)
        })
        
        it ('Should extract by hashed name', () => {
            const result = getDataValue(spellMock, "hashed_name_mock")
            
            expect(result).toEqual(dataValues3Mock)
        })

        it ('Should return default value if mValues is not presented', () => {
            const result = getDataValue(spellMock, "DataValueMock4")
            
            expect(result).toEqual([ 1, 1, 1, 1, 1 ])
        })
        
        it ('Should throw in case value not found', () => {
            expect(() => getDataValue(spellMock, "DataValueMock5")).toThrow("Data value 'DataValueMock5' not found")
        })
    })
})
