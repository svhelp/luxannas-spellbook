import { ChampionStats } from "domain/riotApiSchema/ChampionStats"
import { localDataFetcher } from "./dataFetcher/localDataFetcher"
import { calculationFactory } from "../calculation"
import { CalculationContext } from "domain/CalculationContext"
import { Spell } from "domain/jsonSchema/SpellData"
import { initStats } from "./initStats"

export const playerContext = (name: string, isLocal?: boolean) => {
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

    const passive = initSpell(championData.passiveSpellData, name)

    const spells = championData.spellsData.map(spell => initSpell(spell, name))

    const getContext = (spellIndex: number): CalculationContext => {
        return {
            championLevel: level,
            spellLevel: spellLevels[spellIndex],
            
            currentStats,
            baseStats,
        }
    }

    const getSpells = () => {
        const context = getContext(0)

        console.log(`${name}\n`)

        for (const calculation of passive.calculations) {
            const { value: newValue, formula } = calculation.calculation.getItems(context)

            console.log(`${calculation.name}. ${newValue} (${formula})`)
        }

        console.log("\n")

        let index = 0

        for (const spell of spells) {
            const context = getContext(index);

            for (const calculation of spell.calculations) {

                const { value: newValue, formula } = calculation.calculation.getItems(context)

                console.log(`${calculation.name}. ${newValue} (${formula})`)
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

const initSpell = (spellData: Spell, name: string) => {
    const spellName = spellData.mClientData.mTooltipData.mObjectName
    const calculations = []

    for (const calculationName in spellData.mSpellCalculations) {
        const calculationData = spellData.mSpellCalculations[calculationName]

        if (calculationData.__type != "GameCalculation") {

            // if ("GameCalculationModified" === calculationData.__type) {
            //     console.log(name)
            //     console.log(spellName)
            //     console.log(calculationName)
            //     console.log(calculationData)
            // }

            continue
        }

        const calculation = calculationFactory(spellData, calculationData, name)

        calculations.push({
            name: calculationName,
            calculation
        })
    }

    return {
        name: spellName,
        calculations
    };
}
