import { CalculationPart } from "domain/CalculationPart";
import { FormulaPartItem } from "domain/jsonSchema/FormulaPartItem";
import { abilityResourceByCoefficientCalculationPart } from "./implementation/abilityResourceByCoefficientCalculationPart";
import { buffCounterByCoefficientCalculationPart } from "./implementation/buffCounterByCoefficientCalculationPart";
import { buffCounterByNamedDataValueCalculationPart } from "./implementation/buffCounterByNamedDataValueCalculationPart";
import { byCharLevelBreakpointsCalculationPart } from "./implementation/byCharLevelBreakpointsCalculationPart";
import { byCharLevelInterpolationCalculationPart } from "./implementation/byCharLevelInterpolationCalculationPart";
import { byCharLevelFormulaCalculationPart } from "./implementation/byCharLevelFormulaCalculationPart";
import { clampBySubpartCalculationPart } from "./implementation/clampBySubpartCalculationPart";
import { effectValueCalculationPart } from "./implementation/effectValueCalculationPart";
import { namedDataValueCalculationPart } from "./implementation/namedDataValueCalculationPart";
import { numberCalculationPart } from "./implementation/numberCalculationPart";
import { productOfSubPartsCalculationPart } from "./implementation/productOfSubPartsCalculationPart";
import { statByCoefficientCalculationPart } from "./implementation/statByCoefficientCalculationPart";
import { statByNamedDataValueCalculationPart } from "./implementation/statByNamedDataValueCalculationPart";
import { statBySubPartCalculationPart } from "./implementation/statBySubPartCalculationPart";
import { sumOfSubPartsCalculationPart } from "./implementation/sumOfSubPartsCalculationPart";
import { gameplayCalculationPart } from "./implementation/gameplayCalculationPart";
import { Spell } from "domain/jsonSchema/SpellData";

export const parseCalculationPart = (spell: Spell, inputData: FormulaPartItem, championName: string): CalculationPart => {
    const calculationType = inputData.__type

    if (calculationType === "ByCharLevelBreakpointsCalculationPart") {
        //console.log(championName)
    }

    if (championName == "kasnte") {
        //console.log(calculationType)
    }

    switch (calculationType) {
        case "AbilityResourceByCoefficientCalculationPart": {
            return abilityResourceByCoefficientCalculationPart(inputData)
        }
        case "BuffCounterByCoefficientCalculationPart": {
            return buffCounterByCoefficientCalculationPart(inputData)
        }
        case "BuffCounterByNamedDataValueCalculationPart": {
            return buffCounterByNamedDataValueCalculationPart(inputData, spell)
        }
        case "ByCharLevelBreakpointsCalculationPart": {
            return byCharLevelBreakpointsCalculationPart(inputData)
        }
        case "ByCharLevelInterpolationCalculationPart": {
            return byCharLevelInterpolationCalculationPart(inputData)
        }
        case "ByCharLevelFormulaCalculationPart": {
            return byCharLevelFormulaCalculationPart(inputData)
        }
        case "{803dae4c}": {
            const subparts = inputData.mSubparts.map(x => parseCalculationPart(spell, x, championName))

            return clampBySubpartCalculationPart(inputData, subparts)
        }
        case "EffectValueCalculationPart": {
            return effectValueCalculationPart(inputData, spell)
        }
        case "NamedDataValueCalculationPart": {
            return namedDataValueCalculationPart(inputData, spell)
        }
        case "NumberCalculationPart": {
            return numberCalculationPart(inputData)
        }
        case "ProductOfSubPartsCalculationPart": {
            const part1 = parseCalculationPart(spell, inputData.mPart1, championName)
            const part2 = parseCalculationPart(spell, inputData.mPart2, championName)

            return productOfSubPartsCalculationPart(part1, part2)
        }
        case "StatByCoefficientCalculationPart": {
            return statByCoefficientCalculationPart(inputData)
        }
        case "StatByNamedDataValueCalculationPart": {
            return statByNamedDataValueCalculationPart(inputData, spell)
        }
        case "StatBySubPartCalculationPart": {
            const subpart = parseCalculationPart(spell, inputData.mSubpart, championName)

            return statBySubPartCalculationPart(inputData, subpart)
        }
        case "SumOfSubPartsCalculationPart": {
            const subparts = inputData.mSubparts.map(x => parseCalculationPart(spell, x, championName))

            return sumOfSubPartsCalculationPart(subparts)
        }
        case "{ea2ab5ca}":
        case "{f3cbe7b2}":
        case "CooldownMultiplierCalculationPart": {
            return gameplayCalculationPart(inputData)
        }
        default: {

            console.log(inputData)

            throw new Error(`Unknown calculation part type: ${calculationType}`)
        }
    }
}
