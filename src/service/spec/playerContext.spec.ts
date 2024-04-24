import "./mock"
import { describe, expect, it } from "@jest/globals";
import { localDataFetcher } from "../dataFetcher/localDataFetcher";
import { playerContext } from "../playerContext";

const championNameMock = "Diana"

describe("playerContext", () => {    
    it("Should fetch champion data", () => {
        const pathMock = "Path mock"
        playerContext(championNameMock, [], pathMock)

        expect(localDataFetcher.fetchChampionData).toBeCalledWith(championNameMock, pathMock)
    })
})
