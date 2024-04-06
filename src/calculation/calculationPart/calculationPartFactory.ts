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
import { cooldownMultiplierCalculationPart } from "./implementation/cooldownMultiplierCalculationPart";
import { Spell } from "domain/jsonSchema/SpellData";
import { ksanteQSkillPart } from "./implementation/ksanteQSkillPart";
import { udyrCalculationPart } from "./implementation/udyrCalculationPart";

export const parseCalculationPart = (spell: Spell, inputData: FormulaPartItem): CalculationPart => {
    const calculationType = inputData.__type

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
            const subparts = inputData.mSubparts.map(x => parseCalculationPart(spell, x))

            return clampBySubpartCalculationPart(inputData, subparts)
        }
        case "CooldownMultiplierCalculationPart": {
            return cooldownMultiplierCalculationPart(inputData)
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
            const part1 = parseCalculationPart(spell, inputData.mPart1)
            const part2 = parseCalculationPart(spell, inputData.mPart2)

            return productOfSubPartsCalculationPart(part1, part2)
        }
        case "StatByCoefficientCalculationPart": {
            return statByCoefficientCalculationPart(inputData)
        }
        case "StatByNamedDataValueCalculationPart": {
            return statByNamedDataValueCalculationPart(inputData, spell)
        }
        case "StatBySubPartCalculationPart": {
            const subpart = parseCalculationPart(spell, inputData.mSubpart)

            return statBySubPartCalculationPart(inputData, subpart)
        }
        case "SumOfSubPartsCalculationPart": {
            const subparts = inputData.mSubparts.map(x => parseCalculationPart(spell, x))

            return sumOfSubPartsCalculationPart(subparts)
        }
        case "{f3cbe7b2}": {
            return ksanteQSkillPart()
        }
        case "{ea2ab5ca}": {
            return udyrCalculationPart();
        }
        default: {

            console.log(inputData)

            throw new Error(`Unknown calculation part type: ${calculationType}`)
        }
    }
}
