import { AbilityResourceType } from "./AbilityResourceType"

export type RootChampionData = {
    mCharacterName: string
    baseHP: number
    hpPerLevel: number
    baseStaticHPRegen: number
    hpRegenPerLevel: number
    baseDamage: number
    damagePerLevel: number
    baseArmor: number
    armorPerLevel: number
    baseSpellBlock: number
    spellBlockPerLevel: number
    baseMoveSpeed: number
    attackRange: number
    attackSpeed: number
    attackSpeedRatio: number
    attackSpeedPerLevel: number
    mAdaptiveForceToAbilityPowerWeight: number
    acquisitionRange: number
    mCharacterPassiveSpell: string
    spellNames: string[]
    primaryAbilityResource: AbilityResource,
    secondaryAbilityResource?: AbilityResource,
    unitTagsString: "Champion"
    __type: "CharacterRecord"
}

export type AbilityResource = {
    arType: AbilityResourceType
    arBase: number
    arPerLevel: number
    arBaseStaticRegen: number
    arRegenPerLevel: number
    arIncrements: number
    arMaxSegments: number
    __type: "AbilityResourceSlotInfo"
}
