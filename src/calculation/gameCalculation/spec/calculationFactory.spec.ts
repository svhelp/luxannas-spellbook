import { describe, expect, jest, it } from "@jest/globals";
import { gameCalculationFactory } from "../gameCalculationFactory";
import { gameCalculation } from "../implementation/gameCalculation";
import { gameCalculationConditional } from "../implementation/gameCalculationConditional";
import { gameCalculationModified } from "../implementation/gameCalculationModified";

jest.mock('../implementation/gameCalculation')
jest.mock('../implementation/gameCalculationConditional')
jest.mock('../implementation/gameCalculationModified')

describe("calculationFactory", () => {
    describe.each([
        [ "GameCalculation", gameCalculation ],
        [ "GameCalculationModified", gameCalculationModified ],
        [ "GameCalculationConditional", gameCalculationConditional ],
        
    ])("Corresponding calculation initializator should be called", (calculationType, expectedInitializer) => {
        it(calculationType, () => {
            const calculationMock = {
                __type: calculationType,
            }

            gameCalculationFactory(undefined, calculationMock as any, "")

            expect(expectedInitializer).toHaveBeenCalled()
        })
    })

    it('Should throw in case of unknown calculation part type', () => {
        const wrongCalculationMock = {
            __type: "WrongCalculationMockType"
        } as const

        expect(() => gameCalculationFactory(undefined, wrongCalculationMock as any, "")).toThrow("Unknown calculation type: WrongCalculationMockType")
    })
})
