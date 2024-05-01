import "./mock"
import { describe, expect, it } from "@jest/globals";
import { playerContext } from "../playerContext";
import { dataFetcherFactory } from "../../dataFetcher/dataFetcherFactory";

describe("playerContext", () => {    
    it.skip("Should fetch champion data", () => {
        const configMock = {
            championName: "champion",
            customUri: "Path mock"
        }
        playerContext(configMock, [])

        expect(dataFetcherFactory).toBeCalledWith(configMock)
    })
})
