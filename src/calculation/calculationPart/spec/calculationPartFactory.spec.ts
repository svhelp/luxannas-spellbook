import {describe, expect, it, jest} from '@jest/globals';
import { parseCalculationPart } from "../"
import * as abilityResourceByCoefficientCalculationPartContainer from "../implementation/abilityResourceByCoefficientCalculationPart"
import * as buffCounterByCoefficientCalculationPartContainer from "../implementation/buffCounterByCoefficientCalculationPart"
import * as buffCounterByNamedDataValueCalculationPartContainer from "../implementation/buffCounterByNamedDataValueCalculationPart"
import * as byCharLevelInterpolationCalculationPartContainer from "../implementation/byCharLevelInterpolationCalculationPart"
import * as byCharLevelBreakpointsCalculationPartContainer from "../implementation/byCharLevelBreakpointsCalculationPart"
import * as byCharLevelFormulaCalculationPartContainer from "../implementation/byCharLevelFormulaCalculationPart"
import * as clampBySubpartCalculationPartContainer from "../implementation/clampBySubpartCalculationPart"
import * as effectValueCalculationPartContainer from "../implementation/effectValueCalculationPart"
import * as namedDataValueCalculationPartContainer from "../implementation/namedDataValueCalculationPart"
import * as numberCalculationPartContainer from "../implementation/numberCalculationPart"
import * as productOfSubPartsCalculationPartContainer from "../implementation/productOfSubPartsCalculationPart"
import * as statByCoefficientCalculationPartContainer from "../implementation/statByCoefficientCalculationPart"
import * as statByNamedDataValueCalculationPartContainer from "../implementation/statByNamedDataValueCalculationPart"
import * as statBySubPartCalculationPartContainer from "../implementation/statBySubPartCalculationPart"
import * as sumOfSubPartsCalculationPartContainer from "../implementation/sumOfSubPartsCalculationPart"

const abilityResourceByCoefficientCalculationPartCalled = jest.spyOn(abilityResourceByCoefficientCalculationPartContainer, "abilityResourceByCoefficientCalculationPart")
const buffCounterByCoefficientCalculationPartCalled = jest.spyOn(buffCounterByCoefficientCalculationPartContainer, "buffCounterByCoefficientCalculationPart")
const buffCounterByNamedDataValueCalculationPartCalled = jest.spyOn(buffCounterByNamedDataValueCalculationPartContainer, "buffCounterByNamedDataValueCalculationPart")
const byCharLevelBreakpointsCalculationPartCalled = jest.spyOn(byCharLevelBreakpointsCalculationPartContainer, "byCharLevelBreakpointsCalculationPart")
const byCharLevelInterpolationCalculationPartCalled = jest.spyOn(byCharLevelInterpolationCalculationPartContainer, "byCharLevelInterpolationCalculationPart")
const byCharLevelFormulaCalculationPartCalled = jest.spyOn(byCharLevelFormulaCalculationPartContainer, "byCharLevelFormulaCalculationPart")
const clampBySubpartCalculationPartCalled = jest.spyOn(clampBySubpartCalculationPartContainer, "clampBySubpartCalculationPart")
const effectValueCalculationPartCalled = jest.spyOn(effectValueCalculationPartContainer, "effectValueCalculationPart")
const namedDataValueCalculationPartCalled = jest.spyOn(namedDataValueCalculationPartContainer, "namedDataValueCalculationPart")
const numberCalculationPartCalled = jest.spyOn(numberCalculationPartContainer, "numberCalculationPart")
const productOfSubPartsCalculationPartCalled = jest.spyOn(productOfSubPartsCalculationPartContainer, "productOfSubPartsCalculationPart")
const statByCoefficientCalculationPartCalled = jest.spyOn(statByCoefficientCalculationPartContainer, "statByCoefficientCalculationPart")
const statByNamedDataValueCalculationPartCalled = jest.spyOn(statByNamedDataValueCalculationPartContainer, "statByNamedDataValueCalculationPart")
const statBySubPartCalculationPartCalled = jest.spyOn(statBySubPartCalculationPartContainer, "statBySubPartCalculationPart")
const sumOfSubPartsCalculationPartCalled = jest.spyOn(sumOfSubPartsCalculationPartContainer, "sumOfSubPartsCalculationPart")

describe('calculationPartFactory', () => {
    describe.each([
        [ "AbilityResourceByCoefficientCalculationPart", abilityResourceByCoefficientCalculationPartCalled ],
        [ "BuffCounterByCoefficientCalculationPart", buffCounterByCoefficientCalculationPartCalled ],
        [ "BuffCounterByNamedDataValueCalculationPart", buffCounterByNamedDataValueCalculationPartCalled ],
        [ "ByCharLevelBreakpointsCalculationPart", byCharLevelBreakpointsCalculationPartCalled ],
        [ "ByCharLevelInterpolationCalculationPart", byCharLevelInterpolationCalculationPartCalled ],
        [ "ByCharLevelFormulaCalculationPart", byCharLevelFormulaCalculationPartCalled ],
        [ "{803dae4c}", clampBySubpartCalculationPartCalled ],
        [ "EffectValueCalculationPart", effectValueCalculationPartCalled ],
        [ "NamedDataValueCalculationPart", namedDataValueCalculationPartCalled ],
        [ "NumberCalculationPart", numberCalculationPartCalled ],
        [ "ProductOfSubPartsCalculationPart", productOfSubPartsCalculationPartCalled ],
        [ "StatByCoefficientCalculationPart", statByCoefficientCalculationPartCalled ],
        [ "StatByNamedDataValueCalculationPart", statByNamedDataValueCalculationPartCalled ],
        [ "StatBySubPartCalculationPart", statBySubPartCalculationPartCalled ],
        [ "SumOfSubPartsCalculationPart", sumOfSubPartsCalculationPartCalled ],
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
