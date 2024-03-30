import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { localDataFetcher } from "./dataFetcher/localDataFetcher"
import { ChampionData } from "domain/ChampionData"

export const playerContext = (name: string, isLocal?: boolean) => {
    if (!isLocal) {
        throw new Error("Currently only local data source is supported.")
    }

    const championData = localDataFetcher.fetchChampionData(name)

    const runes = [

    ]

    let level = 1
    let spellLevels = [ 0, 0, 0, 0, 0 ]

    let stats = initStats(championData)

    let items = [

    ]

    const setStats = (data: Partial<ChampionStats>) => {
        stats = { ...stats, ...data }
    }

    const setSpellLevels = (data: number[]) => {
        if (data.length !== 5) {
            throw new Error("Spell levels should contain 5 items")
        }

        spellLevels = { ...data }
    }

    return {
        getStats: () => stats,

        setStats,
        setSpellLevels
    }
}

const initStats = (championData: ChampionData): ChampionStats => ({
    abilityHaste: 0,
    abilityPower: 0,
    //cooldownReduction: number to verify

    attackDamage: championData.rootChampionData.baseDamage,
    attackRange: championData.rootChampionData.attackRange,
    attackSpeed: championData.rootChampionData.attackSpeed,

    critChance: 0,
    critDamage: 0, // ?

    maxHealth: championData.rootChampionData.baseHP,
    currentHealth: 0,
    healShieldPower: 0, // ?
    healthRegenRate: championData.rootChampionData.baseStaticHPRegen,

    physicalLethality: 0,
    armor: championData.rootChampionData.baseArmor,
    armorPenetrationFlat: 0,
    armorPenetrationPercent: 0,
    bonusArmorPenetrationPercent: 0,

    magicLethality: 0,
    magicResist: championData.rootChampionData.baseSpellBlock,
    magicPenetrationFlat: 0,
    magicPenetrationPercent: 0,
    bonusMagicPenetrationPercent: 0,

    lifeSteal: 0,
    physicalVamp: 0,
    spellVamp: 0,
    omnivamp: 0,
    
    resourceMax: championData.rootChampionData.primaryAbilityResource.arBase,
    resourceRegenRate: championData.rootChampionData.primaryAbilityResource.arBaseStaticRegen,
    resourceType: championData.rootChampionData.primaryAbilityResource.arType,
    resourceValue: 0,

    moveSpeed: championData.rootChampionData.baseMoveSpeed,
    tenacity: 0
})
