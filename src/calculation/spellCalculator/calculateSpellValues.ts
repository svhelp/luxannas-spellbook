import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext"
import { CalculationProviderContainer } from "./CalculationProviderContainer"
import { calculateValueByParts, inferFormulaByParts } from "calculation/calculationPart/implementation/utils"
import { CalculationProvider, GameCalculationProvider, ModifiedGameCalculationProvider, ConditionalGameCalculationProvider } from "calculation/gameCalculation/GameCalculationProvider"
import { CalculationDTO } from "./CalculationDTO"
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart"

type CalculationResult = {
    name: string
    items: CalculationPart[]
    altItems?: CalculationPart[]
}

export const calculateSpellValues = (context: CalculationContext, calculations: CalculationProviderContainer<CalculationProvider>[]) => {
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

    const result: CalculationDTO[] = []

    for (const calculationResult of calculationResults) {
        const calculationDto: CalculationDTO = {
            name: calculationResult.name,
            value: calculateValueByParts(context, calculationResult.items),
            formula: inferFormulaByParts(context, calculationResult.items),
        }

        if (calculationResult.altItems) {
            calculationDto.valueAlt = calculateValueByParts(context, calculationResult.altItems)
            calculationDto.formulaAlt = inferFormulaByParts(context, calculationResult.altItems)
        }

        result.push(calculationDto)
    }

    return result
}
