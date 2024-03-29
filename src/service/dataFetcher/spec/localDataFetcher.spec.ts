import { describe, expect, it, jest } from "@jest/globals";
import { localDataFetcher } from "../localDataFetcher";

const dianaContentMock = JSON.stringify({ data: 'Content' })

const fileSystemMock = {
    './src/test-data/champions/aatrox/aatrox.bin.json': '{}',
    './src/test-data/champions/diana/diana.bin.json': dianaContentMock,
    './src/test-data/champions/fiora/aatrox.bin.json': '{}',
    './src/test-data/champions/morgana/morgana.bin.json': '{ Wrong content }',
};

jest.mock('fs')

describe("localDataFetcher", () => {
    describe("Should throw on not found", () => {
        it("directory missing", () => {
            const championNameMock = "wrong_diana"

            require('fs').__setMockFiles(fileSystemMock)

            expect(() => localDataFetcher.fetchChampionData(championNameMock)).toThrow("Champion data not found for " + championNameMock)
        })

        it("file missing", () => {
            const championNameMock = "fiora"

            require('fs').__setMockFiles(fileSystemMock)

            expect(() => localDataFetcher.fetchChampionData(championNameMock)).toThrow("Champion data not found for " + championNameMock)
        })
    })
    
    // it("Should process champion data", () => {
    //     const championNameMock = "diana"

    //     require('fs').__setMockFiles(fileSystemMock)

    //     const fetchedData = localDataFetcher.fetchChampionData(championNameMock)

    //     expect(JSON.stringify(fetchedData)).toEqual(dianaContentMock)
    // })
})
