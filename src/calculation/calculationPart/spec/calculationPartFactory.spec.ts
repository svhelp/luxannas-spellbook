import {describe, expect, it, jest} from '@jest/globals';
import { parseCalculationPart } from "../"
import { statByNamedDataValueCalculationPart } from '../implementation/statByNamedDataValueCalculationPart';
import { abilityResourceByCoefficientCalculationPart } from '../implementation/abilityResourceByCoefficientCalculationPart';
import { buffCounterByCoefficientCalculationPart } from '../implementation/buffCounterByCoefficientCalculationPart';
import { buffCounterByNamedDataValueCalculationPart } from '../implementation/buffCounterByNamedDataValueCalculationPart';
import { byCharLevelBreakpointsCalculationPart } from '../implementation/byCharLevelBreakpointsCalculationPart';
import { byCharLevelFormulaCalculationPart } from '../implementation/byCharLevelFormulaCalculationPart';
import { byCharLevelInterpolationCalculationPart } from '../implementation/byCharLevelInterpolationCalculationPart';
import { clampBySubpartCalculationPart } from '../implementation/clampBySubpartCalculationPart';
import { effectValueCalculationPart } from '../implementation/effectValueCalculationPart';
import { gameplayCalculationPart } from '../implementation/gameplayCalculationPart';
import { namedDataValueCalculationPart } from '../implementation/namedDataValueCalculationPart';
import { numberCalculationPart } from '../implementation/numberCalculationPart';
import { productOfSubPartsCalculationPart } from '../implementation/productOfSubPartsCalculationPart';
import { statByCoefficientCalculationPart } from '../implementation/statByCoefficientCalculationPart';
import { statBySubPartCalculationPart } from '../implementation/statBySubPartCalculationPart';
import { sumOfSubPartsCalculationPart } from '../implementation/sumOfSubPartsCalculationPart';

jest.mock('../implementation/statByNamedDataValueCalculationPart')
jest.mock('../implementation/abilityResourceByCoefficientCalculationPart')
jest.mock('../implementation/buffCounterByCoefficientCalculationPart')
jest.mock('../implementation/buffCounterByNamedDataValueCalculationPart')
jest.mock('../implementation/byCharLevelBreakpointsCalculationPart')
jest.mock('../implementation/byCharLevelFormulaCalculationPart')
jest.mock('../implementation/byCharLevelInterpolationCalculationPart')
jest.mock('../implementation/clampBySubpartCalculationPart')
jest.mock('../implementation/effectValueCalculationPart')
jest.mock('../implementation/gameplayCalculationPart')
jest.mock('../implementation/namedDataValueCalculationPart')
jest.mock('../implementation/numberCalculationPart')
jest.mock('../implementation/productOfSubPartsCalculationPart')
jest.mock('../implementation/statByCoefficientCalculationPart')
jest.mock('../implementation/statBySubPartCalculationPart')
jest.mock('../implementation/sumOfSubPartsCalculationPart')

describe('calculationPartFactory', () => {
    describe.each([
        [ "AbilityResourceByCoefficientCalculationPart", abilityResourceByCoefficientCalculationPart ],
        [ "BuffCounterByCoefficientCalculationPart", buffCounterByCoefficientCalculationPart ],
        [ "BuffCounterByNamedDataValueCalculationPart", buffCounterByNamedDataValueCalculationPart ],
        [ "ByCharLevelBreakpointsCalculationPart", byCharLevelBreakpointsCalculationPart ],
        [ "ByCharLevelInterpolationCalculationPart", byCharLevelInterpolationCalculationPart ],
        [ "ByCharLevelFormulaCalculationPart", byCharLevelFormulaCalculationPart ],
        // [ "{803dae4c}", clampBySubpartCalculationPart ],
        [ "EffectValueCalculationPart", effectValueCalculationPart ],
        [ "NamedDataValueCalculationPart", namedDataValueCalculationPart ],
        [ "NumberCalculationPart", numberCalculationPart ],
        // [ "ProductOfSubPartsCalculationPart", productOfSubPartsCalculationPart ],
        [ "StatByCoefficientCalculationPart", statByCoefficientCalculationPart ],
        [ "StatByNamedDataValueCalculationPart", statByNamedDataValueCalculationPart ],
        // [ "StatBySubPartCalculationPart", statBySubPartCalculationPart ],
        // [ "SumOfSubPartsCalculationPart", sumOfSubPartsCalculationPart ],
        [ "CooldownMultiplierCalculationPart", gameplayCalculationPart ],
        [ "{ea2ab5ca}", gameplayCalculationPart ],
        [ "{f3cbe7b2}", gameplayCalculationPart ],
    ])("Corresponding part initializator should be called", (partType, expectedInitializer) => {
        it(partType, () => {
            const partMock = {
                __type: partType,
            }

            parseCalculationPart(undefined, partMock as any, "")

            expect(expectedInitializer).toHaveBeenCalled()
        })
    })

    it('Should throw in case of unknown calculation type', () => {
        const wrongPartMock = {
            __type: "WrongPartMockType"
        } as const

        expect(() => parseCalculationPart(undefined, wrongPartMock as any, "")).toThrow("Unknown calculation part type: WrongPartMockType")
    })
})
