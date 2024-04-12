import { ResourceType } from "../common/ResourceType"

type CalculatedStats = {
    cooldownReduction: number
}

export type ChampionStats = CalculatedStats & {
    abilityHaste: number
    abilityPower: number

    attackDamage: number
    attackRange: number
    attackSpeed: number

    critChance: number
    critDamage: number

    maxHealth: number
    currentHealth: number
    healShieldPower: number
    healthRegenRate: number

    physicalLethality: number
    armor: number
    armorPenetrationFlat: number
    armorPenetrationPercent: number
    bonusArmorPenetrationPercent: number

    magicLethality: number
    magicResist: number
    magicPenetrationFlat: number
    magicPenetrationPercent: number
    bonusMagicPenetrationPercent: number

    lifeSteal: number
    physicalVamp: number
    spellVamp: number
    omnivamp: number

    resourceMax: number
    resourceRegenRate: number
    resourceType: ResourceType
    resourceValue: number

    moveSpeed: number
    tenacity: number
}

export type NonCountableStats = {
    percentMissingHealth: number
}
