import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { localDataFetcher } from "./dataFetcher/localDataFetcher"
import { ChampionData } from "domain/ChampionData"
import { spellCalculation } from "../calculation"
import { CalculationContext } from "domain/CalculationContext"

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

    const spells = championData.spellsData.map(spell => {
        const name = spell.mClientData.mTooltipData.mObjectName
        const calculations = []

        for (const calculationName in spell.mSpellCalculations) {
            if (spell.mSpellCalculations[calculationName].__type != "GameCalculation") {
                continue
            }

            const calculation = spellCalculation(spell, spell.mSpellCalculations[calculationName])

            calculations.push({
                name: calculationName,
                calculation
            })
        }

        return {
            name,
            calculations
        };
    })

    const getContext = (spellIndex: number): CalculationContext => {
        return {
            championLevel: level,
            spellLevel: spellLevels[spellIndex],
            
            currentStats: stats,
            initStats: initStats(championData),
        }
    }

    const getSpells = () => {
        let index = 0

        for (const spell of spells) {
            const context = getContext(index);

            for (const calculation of spell.calculations) {
                console.log(`${calculation.name}: ${calculation.calculation.getValue(context)} (${calculation.calculation.getString(context)})`)
            }

            index++
            console.log("\n")
        }
    }

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
        getName: () => name,
        getStats: () => stats,
        getSpells,

        setStats,
        setSpellLevels
    }
}

const initStats = (championData: ChampionData): ChampionStats => ({
    abilityHaste: 0,
    abilityPower: 1,
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
