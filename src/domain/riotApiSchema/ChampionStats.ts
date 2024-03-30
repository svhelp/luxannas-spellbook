import { ResourceType } from "../common/ResourceType"

export type ChampionStats = {
    abilityHaste: number
    abilityPower: number
    //cooldownReduction: number to verify

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
    resourceType: ResourceType,
    resourceValue: number

    moveSpeed: number
    tenacity: number
}
