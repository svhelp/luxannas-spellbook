import { ResourceType } from "domain/common/ResourceType";
import { Spell } from "domain/jsonSchema/SpellData";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";

export const spellMock: Spell = {
    mClientData: undefined,
    mEffectAmount: [
        {
            value: [ 0, 1, 2, 3, 4, 5 ],
            __type: "SpellEffectAmount"
        },
        {
            value: [ 6, 7, 8, 9, 10, 11 ],
            __type: "SpellEffectAmount"
        },
        {
            value: [ 0, .01, .05, .1, .2, .5],
            __type: "SpellEffectAmount"
        },
        {
            __type: "SpellEffectAmount"
        },
    ],
    mDataValues: [
        {
            mName: "DataValueMock1",
            mValues: [ 0, 1, 2, 3, 4, 5 ],
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock2",
            mValues: [ 6, 7, 8, 9, 10, 11 ],
            __type: "SpellDataValue"
        },
        {
            mName: "DataValueMock3",
            mValues: [ 0, .01, .05, .1, .2, .5],
            __type: "SpellDataValue"
        },
    ],
    __type: "SpellDataResource"
}

export const initStatsMock: ChampionStats = {
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

export const currentStatsMock: ChampionStats = {
    ...initStatsMock,
    attackDamage: 200,
    maxHealth: 1600,
}