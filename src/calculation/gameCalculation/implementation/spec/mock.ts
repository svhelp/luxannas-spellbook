import { jest } from "@jest/globals";
import {
    numberCalculationPartDataMock,
    numberCalculationPartMock,
    namedDataValueCalculationPartDataMock,
    namedDataValueCalculationPartMock,
    multiplierDataMock,
    multiplierPartMock,
    defaultMultiplierDataMock,
    defaultMultiplierPartMock,
    multipliedPartItemsMock,
    nonCountableMultiplierDataMock,
    nonCountableMultiplierPartMock
} from "./constants";

jest.mock('calculation/calculationPart', () => ({
    parseCalculationPart: jest.fn().mockImplementation((spellData, partData) => {
        if (partData === numberCalculationPartDataMock) {
            return numberCalculationPartMock
        }
        
        if (partData === namedDataValueCalculationPartDataMock) {
            return namedDataValueCalculationPartMock
        }
        
        if (partData === multiplierDataMock) {
            return multiplierPartMock
        }
        
        if (partData === defaultMultiplierDataMock) {
            return defaultMultiplierPartMock
        }

        if (partData === nonCountableMultiplierDataMock) {
            return nonCountableMultiplierPartMock
        }
    })
}))

jest.mock('calculation/calculationPart/implementation/utils', () => ({
    calculateValueByParts: jest.fn().mockImplementation(() => 5),
    multiplyItems: jest.fn().mockImplementation((items, multiplier) => {
        if (multiplier === 5) {
            return multipliedPartItemsMock
        }

        return items
    })
}))
