import { ChampionData } from "domain/ChampionData";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";

export const initStats = (championData: ChampionData, level?: number): ChampionStats => {

    const levelToCalculate = Math.min(Math.max(level ?? 0, 1), 18) - 1

    const {
        baseDamage, damagePerLevel = 0,
        attackRange,
        attackSpeed, attackSpeedPerLevel = 0,
        baseHP, hpPerLevel,
        baseStaticHPRegen = 0, hpRegenPerLevel = 0,
        baseArmor, armorPerLevel = 0,
        baseSpellBlock, spellBlockPerLevel,
        baseMoveSpeed,
        primaryAbilityResource: {
            arBase = 0, arPerLevel = 0,
            arBaseStaticRegen, arRegenPerLevel = 0,
            arType
        }
    } = championData.rootChampionData

    return {
        abilityHaste: 0,
        abilityPower: 0,
        cooldownReduction: 0,
    
        attackDamage: baseDamage + levelToCalculate * damagePerLevel,
        attackRange: attackRange,
        attackSpeed: attackSpeed + levelToCalculate * attackSpeedPerLevel,
    
        critChance: 0,
        critDamage: 0, // ?
    
        maxHealth: baseHP + levelToCalculate * hpPerLevel,
        currentHealth: 0,
        healShieldPower: 0, // ?
        healthRegenRate: baseStaticHPRegen + levelToCalculate * hpRegenPerLevel,
    
        physicalLethality: 0,
        armor: baseArmor + levelToCalculate * armorPerLevel,
        armorPenetrationFlat: 0,
        armorPenetrationPercent: 0,
        bonusArmorPenetrationPercent: 0,
    
        magicLethality: 0,
        magicResist: baseSpellBlock + levelToCalculate * spellBlockPerLevel,
        magicPenetrationFlat: 0,
        magicPenetrationPercent: 0,
        bonusMagicPenetrationPercent: 0,
    
        lifeSteal: 0,
        physicalVamp: 0,
        spellVamp: 0,
        omnivamp: 0,
        
        resourceMax: arBase + levelToCalculate * arPerLevel,
        resourceRegenRate: arBaseStaticRegen + levelToCalculate * arRegenPerLevel,
        resourceType: arType,
        resourceValue: 0,
    
        moveSpeed: baseMoveSpeed,
        tenacity: 0
    }
}
