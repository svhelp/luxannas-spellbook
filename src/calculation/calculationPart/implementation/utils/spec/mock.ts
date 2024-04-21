import { jest } from "@jest/globals";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";
import { buffPartsMock, complexPartsArrayMock, levelPartsMock, mergedBuffParts, mergedComplexPartsArray, mergedPlainParts, mergedStatParts, plainPartsMock, resourceStatPartMock, statPartsMock } from "./constants";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";

const statsMock: Record<string, number> = {
    resourceType: 0,
    armor: 40,
    abilityPower: 10
}

jest.mock('../getStat', () => ({
    getStat: jest.fn().mockImplementation((context: any, key: keyof ChampionStats) => statsMock[key])
}))
jest.mock('../mergeCalculationParts', () => ({
    mergeCalculationParts: jest.fn().mockImplementation((items: CalculationPart[]) => {
        if (items === plainPartsMock) {
            return mergedPlainParts
        }
    
        if (items === buffPartsMock) {
            return mergedBuffParts
        }
    
        if (items === statPartsMock) {
            return mergedStatParts
        }
        
        if (items === levelPartsMock) {
            return levelPartsMock
        }
        
        if (items === complexPartsArrayMock) {
            return mergedComplexPartsArray
        }
    
        if (items === resourceStatPartMock) {
            return resourceStatPartMock
        }
    
        throw new Error()
    })
}))
