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
import { ByCharLevelInterpolationCalculationPart, ClampBySubpartCalculationPart, NumberCalculationPart, ProductOfSubPartsCalculationPart, StatBySubPartCalculationPart, SumOfSubPartsCalculationPart } from 'domain/jsonSchema/FormulaPartItem';

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

const subpart1: NumberCalculationPart = {
    __type: "NumberCalculationPart"
}

const subpart2: ByCharLevelInterpolationCalculationPart = {
    __type: "ByCharLevelInterpolationCalculationPart"
}

describe('calculationPartFactory', () => {
    describe.each([
        [ "AbilityResourceByCoefficientCalculationPart", abilityResourceByCoefficientCalculationPart ],
        [ "BuffCounterByCoefficientCalculationPart", buffCounterByCoefficientCalculationPart ],
        [ "BuffCounterByNamedDataValueCalculationPart", buffCounterByNamedDataValueCalculationPart ],
        [ "ByCharLevelBreakpointsCalculationPart", byCharLevelBreakpointsCalculationPart ],
        [ "ByCharLevelInterpolationCalculationPart", byCharLevelInterpolationCalculationPart ],
        [ "ByCharLevelFormulaCalculationPart", byCharLevelFormulaCalculationPart ],
        [ "EffectValueCalculationPart", effectValueCalculationPart ],
        [ "NamedDataValueCalculationPart", namedDataValueCalculationPart ],
        [ "NumberCalculationPart", numberCalculationPart ],
        [ "StatByCoefficientCalculationPart", statByCoefficientCalculationPart ],
        [ "StatByNamedDataValueCalculationPart", statByNamedDataValueCalculationPart ],
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

    // TODO: Implement subparts creation tests
    it("Should initialize StatBySubPartCalculationPart and its subpart", () => {
        const partMock: StatBySubPartCalculationPart = {
            __type: "StatBySubPartCalculationPart",
            mSubpart: subpart1
        }

        parseCalculationPart(undefined, partMock as any, "")

        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart1, "")
        expect(statBySubPartCalculationPart).toHaveBeenCalled()
    })
    
    it("Should initialize ProductOfSubPartsCalculationPart and its subpart", () => {
        const partMock: ProductOfSubPartsCalculationPart = {
            __type: "ProductOfSubPartsCalculationPart",
            mPart1: subpart1,
            mPart2: subpart2
        }

        parseCalculationPart(undefined, partMock as any, "")

        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart1, "")
        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart2, "")
        expect(productOfSubPartsCalculationPart).toHaveBeenCalled()
    })
    
    it("Should initialize SumOfSubPartsCalculationPart and its subpart", () => {
        const partMock: SumOfSubPartsCalculationPart = {
            __type: "SumOfSubPartsCalculationPart",
            mSubparts: [ subpart1, subpart2 ]
        }

        parseCalculationPart(undefined, partMock as any, "")

        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart1, "")
        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart2, "")
        expect(sumOfSubPartsCalculationPart).toHaveBeenCalled()
    })
    
    it("Should initialize ClampBySubpartCalculationPart and its subpart", () => {
        const partMock: ClampBySubpartCalculationPart = {
            __type: "{803dae4c}",
            mCeiling: 0,
            mFloor: 10,
            mSubparts: [ subpart1, subpart2 ]
        }

        parseCalculationPart(undefined, partMock as any, "")

        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart1, "")
        // expect(parseCalculationPart).toBeCalledWith(undefined, subpart2, "")
        expect(clampBySubpartCalculationPart).toHaveBeenCalled()
    })

    it('Should throw in case of unknown calculation part type', () => {
        const wrongPartMock = {
            __type: "WrongPartMockType"
        } as const

        expect(() => parseCalculationPart(undefined, wrongPartMock as any, "")).toThrow("Unknown calculation part type: WrongPartMockType")
    })
})
