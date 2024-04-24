import { jest } from "@jest/globals";
import { championDataMock } from "./constants";

jest.mock('../dataFetcher/localDataFetcher', () => ({
    localDataFetcher: {
        fetchChampionData: jest.fn().mockImplementation(() => championDataMock)
    }
}))
