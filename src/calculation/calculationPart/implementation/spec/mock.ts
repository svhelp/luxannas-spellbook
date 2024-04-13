import { jest } from "@jest/globals";
import { ChampionStats } from "domain/riotApiSchema/ChampionStats";
import { initStatsMock } from "./constants";

export const dataValuesMock: Record<string, number[]> = {
    "DataValueMock1": [ 0, 1, 2, 3, 4, 5 ],
    "DataValueMock2": [ 6, 7, 8, 9, 10, 11 ],
    "DataValueMock3": [ 0, .01, .05, .1, .2, .5],
}

jest.mock('../utils/index', () => ({
    getStat: jest.fn().mockImplementation((context: any, key: keyof ChampionStats) => initStatsMock[key]),
    getDataValue: jest.fn().mockImplementation((spell: any, key: string) => dataValuesMock[key])
}));
