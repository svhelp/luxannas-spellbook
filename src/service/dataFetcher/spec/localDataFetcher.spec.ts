import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { localDataFetcher } from "../localDataFetcher";
import { parseChampionData } from "../parsers/parseChampionData";

const dianaContentMock = { data: 'Content' }

const fileSystemMock = {
    'src/test-data/champions/diana/diana.bin.json': JSON.stringify(dianaContentMock),
    'src/test-data/champions/fiora/aatrox.bin.json': '{}',
    'src/test-data/champions/morgana/morgana.bin.json': '{ Wrong content }',
};

const parsingResultMock = {}

jest.mock('fs')

jest.mock('../parsers/parseChampionData', () => ({
    parseChampionData: jest.fn().mockImplementation(() => parsingResultMock)
}));

beforeEach(() => {
    require('fs').__setMockFiles(fileSystemMock)
})

describe("localDataFetcher", () => {
    describe("Should throw on file not found", () => {
        it("directory missing", () => {
            const championNameMock = "wrong_diana"

            expect(() => localDataFetcher.fetchChampionData(championNameMock)).toThrow("Champion data not found for " + championNameMock)
        })

        it("file missing", () => {
            const championNameMock = "fiora"

            expect(() => localDataFetcher.fetchChampionData(championNameMock)).toThrow("Champion data not found for " + championNameMock)
        })
    })

    it("Should throw on corrupted JSON schema", () => {
        const championNameMock = "morgana"

        expect(() => localDataFetcher.fetchChampionData(championNameMock)).toThrow()
    })
    
    it("Should process parsed JSON", () => {
        const championNameMock = "diana"
        
        const parseResult = localDataFetcher.fetchChampionData(championNameMock)

        expect(parseChampionData).toBeCalledWith(dianaContentMock)
        expect(parseResult).toEqual(parsingResultMock)
    })
})
