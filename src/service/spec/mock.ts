import { jest } from "@jest/globals";
import { championDataMock } from "./constants";

jest.mock('../dataFetcher/implementation/localDataFetcher', () => ({
    localDataFetcher: () => ({
        fetchChampionData: jest.fn().mockImplementation(() => Promise.resolve(championDataMock))
    })
}))

jest.mock('../dataFetcher/implementation/webDataFetcher', () => ({
    webDataFetcher: () => ({
        fetchChampionData: jest.fn().mockImplementation(() => Promise.resolve(championDataMock))
    })
}))
