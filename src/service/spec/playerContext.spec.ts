import { describe, expect, it, jest } from "@jest/globals";
import { localDataFetcher } from "../dataFetcher/localDataFetcher";
import { playerContext } from "../playerContext";

const championNameMock = "Diana"

jest.mock('../dataFetcher/localDataFetcher', () => ({
    localDataFetcher: {
        fetchChampionData: jest.fn()
    }
}));

describe("playerContext", () => {
    it("Should throw when local path is not provided", () => {
        expect(() => playerContext(championNameMock, [])).toThrow("Currently only local data source is supported.")
    })
    
    it("Should fetch champion data", () => {
        playerContext(championNameMock, [])

        expect(localDataFetcher.fetchChampionData).toBeCalledWith(championNameMock)
    })
})
