import { ChampionStat } from "../../../domain/jsonSchema/ChampionStat";
import { ChampionStats } from "../../../domain/riotApiSchema/ChampionStats";

export const ChampionStatName: {[key: number]: keyof ChampionStats} = {
    [ChampionStat.AbilityPower]: "abilityPower",
    [ChampionStat.Armor]: "armor",
    [ChampionStat.Attack]: "attackDamage",
    [ChampionStat.AttackSpeed]: "attackSpeed",
    //[ChampionStat.AttackWindupTime]: "",
    [ChampionStat.MagicResist]: "magicResist",
    [ChampionStat.MoveSpeed]: "moveSpeed",
    [ChampionStat.CritChance]: "critChance",
    [ChampionStat.CritDamage]: "critDamage",
    //[ChampionStat.CooldownReduction]: "",
    [ChampionStat.AbilityHaste]: "abilityHaste",
    [ChampionStat.MaxHealth]: "maxHealth",
    [ChampionStat.CurrentHealth]: "currentHealth",
    //[ChampionStat.PercentMissingHealth]: "",
    //[ChampionStat.Unknown14]: "",
    [ChampionStat.LifeSteal]: "lifeSteal",
    [ChampionStat.OmniVamp]: "omnivamp",
    [ChampionStat.PhysicalVamp]: "physicalVamp",
    [ChampionStat.MagicPenetrationFlat]: "magicPenetrationFlat",
    [ChampionStat.MagicPenetrationPercent]: "magicPenetrationPercent",
    [ChampionStat.BonusMagicPenetrationPercent]: "bonusMagicPenetrationPercent",
    [ChampionStat.MagicLethality]: "magicLethality",
    [ChampionStat.ArmorPenetrationFlat]: "armorPenetrationFlat",
    [ChampionStat.ArmorPenetrationPercent]: "armorPenetrationPercent",
    [ChampionStat.BonusArmorPenetrationPercent]: "bonusArmorPenetrationPercent",
    [ChampionStat.PhysicalLethality]: "physicalLethality",
    [ChampionStat.Tenacity]: "tenacity",
    [ChampionStat.AttackRange]: "attackRange",
    [ChampionStat.HealthRegenRate]: "healthRegenRate",
    [ChampionStat.ResourceRegenRate]: "resourceRegenRate",
    //[ChampionStat.Unknown31]: "",
    //[ChampionStat.Unknown32]: "",
    //[ChampionStat.DodgeChance]: "",
}