import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { GameCalculationConditional } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";
import { ConditionalGameCalculationProvider } from "../GameCalculationProvider";

const extractItems = (plainResults: { name: string, items: CalculationPart[] }[], name: string) => {
    const calculationData = plainResults.find(r => r.name === name)

    if (!calculationData) {
        throw new Error("Calculation to modify not found")
    }

    return calculationData.items
}

export const gameCalculationConditional = (spell: Spell, calculationData: GameCalculationConditional, championName: string): ConditionalGameCalculationProvider => {
    const defaultCalculationName = calculationData.mDefaultGameCalculation
    const altCalculationName = calculationData.mConditionalGameCalculation

    return {
        type: "GameCalculationConditional",
        getItems: (context: CalculationContext, plainResults: { name: string, items: CalculationPart[] }[]) => extractItems(plainResults, defaultCalculationName),
        getAltItems: (context: CalculationContext, plainResults: { name: string, items: CalculationPart[] }[]) => extractItems(plainResults, altCalculationName)
    };
}
