import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { localDataFetcher } from "./dataFetcher/localDataFetcher"
import { CalculationContext } from "domain/CalculationContext"
import { initStats } from "./initStats"
import { CalculationResult } from "domain/CalculationResult"
import { initSpell } from "./initSpell"
import { calculateValueByParts, inferFormulaByParts } from "../calculation/calculationPart/implementation/utils"

export const playerContext = (name: string, testData: string[], isLocal?: boolean) => {
    if (!isLocal) {
        throw new Error("Currently only local data source is supported.")
    }

    const championData = localDataFetcher.fetchChampionData(name)

    const runes = [

    ]

    let level = 1
    let spellLevels = [ 0, 0, 0, 0, 0 ]

    let baseStats = initStats(championData)
    let currentStats = initStats(championData)

    let items = [

    ]

    const passive = initSpell(championData.passiveSpellData, name, testData)

    const spells = championData.spellsData.map(spell => initSpell(spell, name, testData))

    const getContext = (spellIndex: number): CalculationContext => {
        return {
            championLevel: level,
            spellLevel: spellLevels[spellIndex],
            
            currentStats,
            baseStats,
        }
    }

    const processCalculationData = () => {

    }

    const getSpells = () => {
        const context = getContext(0)

        console.log(`${name}\n`)

        const passiveGameCalculations = passive.calculations.filter(c => c.calculation.type === "GameCalculation")
        const passiveGameCalculationResults: CalculationResult[] = []

        for (const calculation of passiveGameCalculations) {
            const items = calculation.calculation.getItems(context)
            
            passiveGameCalculationResults.push({
                name: calculation.name,
                items
            })

            const value = calculateValueByParts(context, items)
            const formula = inferFormulaByParts(context, items)

            console.log(`${calculation.name}. ${value} (${formula})`)
        }

        console.log("\n")

        let index = 0

        for (const spell of spells) {
            const context = getContext(index);

            const gameCalculations = spell.calculations.filter(c => c.calculation.type === "GameCalculation")
            const gameCalculationResults: CalculationResult[] = []

            for (const calculation of gameCalculations) {
                const items = calculation.calculation.getItems(context)
                
                gameCalculationResults.push({
                    name: calculation.name,
                    items
                })

                const value = calculateValueByParts(context, items)
                const formula = inferFormulaByParts(context, items)

                console.log(`${calculation.name}. ${value} (${formula})`)
            }

            index++

            console.log("\n")
        }
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
        getName: () => name,
        getStats: () => currentStats,
        getSpells,

        setLevel,
        setStats,
        setSpellLevels
    }
}
