import { ResourceType } from "./ResourceType"

export type ChampionStats = {
    abilityHaste: number
    abilityPower: number
    armor: number
    armorPenetrationFlat: number
    armorPenetrationPercent: number
    attackDamage: number
    attackRange: number
    attackSpeed: number
    bonusArmorPenetrationPercent: number
    bonusMagicPenetrationPercent: number
    //cooldownReduction: number to verify
    critChance: number
    critDamage: number
    currentHealth: number
    healShieldPower: number
    healthRegenRate: number
    lifeSteal: number
    magicLethality: number
    magicPenetrationFlat: number
    magicPenetrationPercent: number
    magicResist: number
    maxHealth: number
    moveSpeed: number
    omnivamp: number
    physicalLethality: number
    physicalVamp: number
    resourceMax: number
    resourceRegenRate: number
    resourceType: ResourceType,
    resourceValue: number
    spellVamp: number
    tenacity: number
}
