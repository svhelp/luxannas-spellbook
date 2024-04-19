import { jest } from "@jest/globals";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";
import { baseStatsMock } from "./constants";
import { CalculationPart } from "domain/CalculationPart";

export const dataValuesMock: Record<string, number[]> = {
    "DataValueMock1": [ 0, 1, 2, 3, 4, 5 ],
    "DataValueMock2": [ 6, 7, 8, 9, 10, 11 ],
    "DataValueMock3": [ 0, .01, .05, .1, .2, .5],
}

jest.mock('../utils/index', () => ({
    getStat: jest.fn().mockImplementation((context: any, key: keyof ChampionStats) => baseStatsMock[key]),
    getDataValue: jest.fn().mockImplementation((spell: any, key: string) => dataValuesMock[key]),
    calculateValueByParts: jest.fn().mockImplementation((context: any, parts: CalculationPart[]) => {
        if (parts.length < 0 || parts[0].type !== "PlainCalculationPart") {
            throw new Error()
        }

        return parts[0].value
    }),
    mergeCalculationParts: jest.fn().mockImplementation((items: CalculationPart[]) => {
        if (items.length < 0) {
            throw new Error()
        }

        return [ items[0] ]
    })
}));
