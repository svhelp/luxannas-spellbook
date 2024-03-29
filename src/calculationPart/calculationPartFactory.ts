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

export const parseCalculationPart = (inputData: FormulaPartItem): CalculationPart => {
    const calculationType = inputData.__type

    switch (calculationType) {
        case "AbilityResourceByCoefficientCalculationPart": {
            return abilityResourceByCoefficientCalculationPart(inputData)
        }
        case "BuffCounterByCoefficientCalculationPart": {
            return buffCounterByCoefficientCalculationPart(inputData)
        }
        case "BuffCounterByNamedDataValueCalculationPart": {
            return buffCounterByNamedDataValueCalculationPart(inputData)
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
            return clampBySubpartCalculationPart(inputData)
        }
        case "EffectValueCalculationPart": {
            return effectValueCalculationPart(inputData)
        }
        case "NamedDataValueCalculationPart": {
            return namedDataValueCalculationPart(inputData)
        }
        case "NumberCalculationPart": {
            return numberCalculationPart(inputData)
        }
        case "ProductOfSubPartsCalculationPart": {
            return productOfSubPartsCalculationPart(inputData)
        }
        case "StatByCoefficientCalculationPart": {
            return statByCoefficientCalculationPart(inputData)
        }
        case "StatByNamedDataValueCalculationPart": {
            return statByNamedDataValueCalculationPart(inputData)
        }
        case "StatBySubPartCalculationPart": {
            return statBySubPartCalculationPart(inputData)
        }
        case "SumOfSubPartsCalculationPart": {
            return sumOfSubPartsCalculationPart(inputData)
        }
        default: {
            throw new Error(`Unknown calculation part type: ${calculationType}`)
        }
    }
}