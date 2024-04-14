import { describe, expect, it } from "@jest/globals"
import { ChampionData } from "domain/ChampionData"
import { ResourceType } from "domain/common/ResourceType"
import { RootChampionData } from "domain/jsonSchema/RootChampionData"
import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { initStats } from "../initStats"

const championDataMock: RootChampionData = {
    mCharacterName: "mock",
    baseHP: 1,
    hpPerLevel: 2,
    baseStaticHPRegen: 3,
    hpRegenPerLevel: 4,
    baseDamage: 5,
    damagePerLevel: 6,
    baseArmor: 7,
    armorPerLevel: 8,
    baseSpellBlock: 9,
    spellBlockPerLevel: 10,
    baseMoveSpeed: 11,
    attackRange: 12,
    attackSpeed: 13,
    attackSpeedRatio: 14,
    attackSpeedPerLevel: 15,
    mAdaptiveForceToAbilityPowerWeight: 16,
    acquisitionRange: 17,
    mCharacterPassiveSpell: "mCharacterPassiveSpell",
    spellNames: [],
    primaryAbilityResource: {
        arType: ResourceType.Energy,
        arBase: 18,
        arPerLevel: 19,
        arBaseStaticRegen: 20,
        arRegenPerLevel: 21,
        arIncrements: 22,
        arMaxSegments: 23,
        __type: "AbilityResourceSlotInfo"
    },
    secondaryAbilityResource: undefined,
    unitTagsString: "Champion",
    __type: "CharacterRecord"
}

const expectedResultTemplate = {
    abilityHaste: 0,
    abilityPower: 0,
    cooldownReduction: 0,
    critChance: 0,
    critDamage: 0, 
    currentHealth: 0,
    healShieldPower: 0,
    physicalLethality: 0,
    armorPenetrationFlat: 0,
    armorPenetrationPercent: 0,
    bonusArmorPenetrationPercent: 0,
    magicLethality: 0,
    magicPenetrationFlat: 0,
    magicPenetrationPercent: 0,
    bonusMagicPenetrationPercent: 0,
    lifeSteal: 0,
    physicalVamp: 0,
    spellVamp: 0,
    omnivamp: 0,
    resourceValue: 0,
    tenacity: 0
} as const

const level1ExpectedResult: ChampionStats = {
    ...expectedResultTemplate,

    attackDamage: 5,
    attackRange: 12,
    attackSpeed: 13,

    maxHealth: 1,
    healthRegenRate: 3,

    armor: 7,
    magicResist: 9,
    
    resourceMax: 18,
    resourceRegenRate: 20,
    resourceType: ResourceType.Energy,

    moveSpeed: 11,
}

const level11ExpectedResult: ChampionStats = {
    ...level1ExpectedResult,

    attackDamage: 5 + 6 * 10,
    attackSpeed: 13 + 15 * 10,

    maxHealth: 1 + 2 * 10,
    healthRegenRate: 3 + 4 * 10,

    armor: 7 + 8 * 10,
    magicResist: 9 + 10 * 10,
    
    resourceMax: 18 + 19 * 10,
    resourceRegenRate: 20 + 21 * 10,
}

const level18ExpectedResult: ChampionStats = {
    ...level1ExpectedResult,

    attackDamage: 5 + 6 * 17,
    attackSpeed: 13 + 15 * 17,

    maxHealth: 1 + 2 * 17,
    healthRegenRate: 3 + 4 * 17,

    armor: 7 + 8 * 17,
    magicResist: 9 + 10 * 17,
    
    resourceMax: 18 + 19 * 17,
    resourceRegenRate: 20 + 21 * 17,
}

const emptyChampionDataMock: RootChampionData = {
    mCharacterName: "mock",
    baseHP: 1,
    hpPerLevel: 2,
    baseDamage: 3,
    baseArmor: 4,
    baseSpellBlock: 5,
    spellBlockPerLevel: 6,
    baseMoveSpeed: 7,
    attackRange: 8,
    attackSpeed: 9,
    attackSpeedRatio: 10,
    attackSpeedPerLevel: 11,
    mAdaptiveForceToAbilityPowerWeight: 12,
    acquisitionRange: 13,
    mCharacterPassiveSpell: "mCharacterPassiveSpell",
    spellNames: [],
    primaryAbilityResource: {
        arType: ResourceType.Energy,
        arBaseStaticRegen: 14,
        arIncrements: 15,
        arMaxSegments: 16,
        __type: "AbilityResourceSlotInfo"
    },
    secondaryAbilityResource: undefined,
    unitTagsString: "Champion",
    __type: "CharacterRecord"
}


const emptyLevel1ExpectedResult: ChampionStats = {
    ...expectedResultTemplate,

    attackDamage: 3,
    attackRange: 8,
    attackSpeed: 9,

    maxHealth: 1,
    healthRegenRate: 0,

    armor: 4,
    magicResist: 5,
    
    resourceMax: 0,
    resourceRegenRate: 14,
    resourceType: ResourceType.Energy,

    moveSpeed: 7
}

const emptyLevel18ExpectedResult: ChampionStats = {
    ...emptyLevel1ExpectedResult,

    attackSpeed: 9 + 11 * 17,
    maxHealth: 1 + 2 * 17,
    magicResist: 5 + 6 * 17,
}

describe("initStats", () => {
    describe("Should calculate values", () => {
        it.each([
            [ 1, level1ExpectedResult ],
            [ 11, level11ExpectedResult ],
            [ 18, level18ExpectedResult ],
        ])("championLevel: $championLevel", (championLevel, expectedResult) => {
            const inputData: ChampionData = {
                rootChampionData: championDataMock,
                passiveSpellData: undefined,
                spellsData: []
            }

            const result = initStats(inputData, championLevel)

            expect(result).toEqual(expectedResult)
        })
    })

    describe("Should use default values", () => {
        it.each([
            [ 1, emptyLevel1ExpectedResult ],
            [ 18, emptyLevel18ExpectedResult ],
        ])("championLevel: $championLevel", (championLevel, expectedResult) => {
            const inputData: ChampionData = {
                rootChampionData: emptyChampionDataMock,
                passiveSpellData: undefined,
                spellsData: []
            }

            const result = initStats(inputData, championLevel)

            expect(result).toEqual(expectedResult)
        })
    })

    it("Should run with no level argument provided", () => {
        const inputData: ChampionData = {
            rootChampionData: championDataMock,
            passiveSpellData: undefined,
            spellsData: []
        }

        const result = initStats(inputData)

        expect(result).toEqual(level1ExpectedResult)
    })

    describe("Should clamp level value", () => {
        it("Should clamp max", () => {
            const inputData: ChampionData = {
                rootChampionData: championDataMock,
                passiveSpellData: undefined,
                spellsData: []
            }
    
            const result = initStats(inputData, -2)
    
            expect(result).toEqual(level1ExpectedResult)
        })

        it("Should clamp min", () => {
            const inputData: ChampionData = {
                rootChampionData: championDataMock,
                passiveSpellData: undefined,
                spellsData: []
            }
    
            const result = initStats(inputData, 25)
    
            expect(result).toEqual(level18ExpectedResult)
        })
    })
})
