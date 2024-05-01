import { describe, expect, it, jest } from "@jest/globals";
import { DataFetcherConfig, DataSource } from "../DataFetcherConfig";
import { dataFetcherFactory } from "../dataFetcherFactory";
import { localDataFetcher } from "../implementation/localDataFetcher";
import { webDataFetcher } from "../implementation/webDataFetcher";

jest.mock("../implementation/localDataFetcher")
jest.mock("../implementation/webDataFetcher")

describe("dataFetcherFactory", () => {
    describe("Should return fetcher according to the type", () => {
        it.each([
            [DataSource.Local, localDataFetcher],
            [DataSource.Web, webDataFetcher],
        ])("source: $source", (source, initializer) => {
            const configMock: DataFetcherConfig = {
                source
            }

            dataFetcherFactory(configMock)

            expect(initializer).toBeCalled()
        })
    })

    it("Should return web fetcher by default", () => {
        const configMock: DataFetcherConfig = {}

        dataFetcherFactory(configMock)

        expect(webDataFetcher).toBeCalled()
    })
})