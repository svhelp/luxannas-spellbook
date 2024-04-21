import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { localDataFetcher } from "./dataFetcher/localDataFetcher"
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext"
import { initStats } from "./initStats"
import { CalculationResult } from "service/CalculationResult"
import { initSpell } from "./initSpell"
import { calculateValueByParts, inferFormulaByParts } from "../calculation/calculationPart/implementation/utils"
import { CalculationProviderContainer } from "./CalculationProviderContainer"
import { CalculationProvider, ConditionalGameCalculationProvider, GameCalculationProvider, ModifiedGameCalculationProvider } from "calculation/GameCalculationProvider"

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

    const printCalculationData = (context: CalculationContext, calculations: CalculationResult[]) => {
        for (const calculation of calculations) {
            const value = calculateValueByParts(context, calculation.items)
            const formula = inferFormulaByParts(context, calculation.items)

            console.log(`${calculation.name}. ${value} (${formula})`)

            if (calculation.altItems) {
                const altValue = calculateValueByParts(context, calculation.altItems)
                const altFormula = inferFormulaByParts(context, calculation.altItems)
    
                console.log(`*ALT ${calculation.name}. ${altValue} (${altFormula})`)
            }
        }
    }

    const getSpellCalculations = (context: CalculationContext, calculations: CalculationProviderContainer<CalculationProvider>[]) => {
        const gameCalculations
            = calculations.filter(c => c.calculation.type === "GameCalculation") as CalculationProviderContainer<GameCalculationProvider>[]
        const modifiedGameCalculations
            = calculations.filter(c => c.calculation.type === "GameCalculationModified") as CalculationProviderContainer<ModifiedGameCalculationProvider>[]
        const conditionalGameCalculations
            = calculations.filter(c => c.calculation.type === "GameCalculationConditional") as CalculationProviderContainer<ConditionalGameCalculationProvider>[]

        const calculationResults: CalculationResult[] = []

        for (const calculationContainer of gameCalculations) {
            const items = calculationContainer.calculation.getItems(context)
            
            calculationResults.push({
                name: calculationContainer.name,
                items
            })
        }

        for (const calculationContainer of modifiedGameCalculations) {
            const items = calculationContainer.calculation.getItems(context, calculationResults)
            
            calculationResults.push({
                name: calculationContainer.name,
                items
            })
        }

        for (const calculationContainer of conditionalGameCalculations) {
            const items = calculationContainer.calculation.getItems(context, calculationResults)
            const altItems = calculationContainer.calculation.getAltItems(context, calculationResults)
            
            calculationResults.push({
                name: calculationContainer.name,
                items,
                altItems
            })
        }

        return calculationResults
    }

    const getSpells = () => {
        console.log(`${name}\n`)

        const context = getContext(0)
        const passiveCalculationResults = getSpellCalculations(context, passive.calculations)

        printCalculationData(context, passiveCalculationResults)
        console.log("\n")

        let index = 0

        for (const spell of spells) {
            const context = getContext(index);
            const calculationResults = getSpellCalculations(context, spell.calculations)

            index++

            printCalculationData(context, calculationResults)
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
