import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext"
import { initStats } from "./initStats"
import { initSpell } from "./initSpell"
import { PlayerContextConfig } from "./PlayerContextConfig"
import { dataFetcherFactory } from "../dataFetcher/dataFetcherFactory"
import { CalculationDTO } from "../calculation/spellCalculator/CalculationDTO"
import { calculateSpellValues } from "calculation/spellCalculator"

export const playerContext = async (config: PlayerContextConfig, testData?: string[]) => {
    const dataFetcher = dataFetcherFactory(config)
    const championData = await dataFetcher.fetchChampionData(config.championName)

    let level = 1
    let spellLevels = [ 0, 0, 0, 0, 0 ]

    let baseStats = initStats(championData)
    let currentStats = initStats(championData)

    const runes = [], items = []

    const passive = initSpell(championData.passiveSpellData, config.championName, testData)
    const spells = championData.spellsData.map(spell => initSpell(spell, config.championName, testData))

    const getContext = (spellIndex: number): CalculationContext => ({
        championLevel: level,
        spellLevel: spellLevels[spellIndex],
        
        currentStats,
        baseStats,
    })

    const getPassiveSpell = () => {
        const context = getContext(0)
        return calculateSpellValues(context, passive.calculations)
    }

    const getSpells = () => {
        const result: Record<string, CalculationDTO[]> = {}
        let index = 0

        for (const spell of spells) {
            const context = getContext(index);
            const calculationResults = calculateSpellValues(context, spell.calculations)

            index++

            result[spell.name] = calculationResults
        }

        return result
    }

    const setStats = (data: Partial<ChampionStats>) => {
        const haste = data.abilityHaste ?? currentStats.abilityHaste

        currentStats = {
            ...currentStats,
            ...data,

            cooldownReduction: -1 * haste / (100 + haste)
        }
    }

    const setLevel = (value: number) => {
        level = value
        baseStats = initStats(championData, value)
    }

    const setSpellLevels = (data: number[]) => {
        if (data.length !== 5) {
            throw new Error("Spell levels should contain 5 items")
        }

        spellLevels = { ...data }
    }

    return {
        getName: () => config.championName,
        getStats: () => currentStats,
        getPassiveSpell,
        getSpells,

        setLevel,
        setStats,
        setSpellLevels
    }
}
