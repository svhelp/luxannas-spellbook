import "./mock"
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { localDataFetcher } from "../localDataFetcher";
import { parseChampionData } from "../../parsers/parseChampionData";
import { mfContentMock, dianaContentMock, corruptedJsonMock, parsingResultMock } from "./constants";

const fileSystemMock = {
    'src/test-data-custom/champions/missfortune/missfortune.bin.json': JSON.stringify(mfContentMock),
    'src/test-data/champions/diana/diana.bin.json': JSON.stringify(dianaContentMock),
    'src/test-data/champions/morgana/morgana.bin.json': corruptedJsonMock,
};

jest.mock('fs')

beforeEach(() => {
    require('fs').__setMockFiles(fileSystemMock)
})

describe("localDataFetcher", () => {
    it("Should return its type", () => {
        const dataFetcher = localDataFetcher({})

        expect(dataFetcher.type).toEqual("LocalDataFetcher")
    })

    describe("Should throw on file not found", () => {
        it("directory missing", async () => {
            const championNameMock = "wrong_diana"
            const expectedFilePath = `src/test-data/champions/${championNameMock}/${championNameMock}.bin.json`
            
            const dataFetcher = localDataFetcher({})
 
            await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch(`Error loading champion data (${expectedFilePath}).`)
        })

        it("file missing", async () => {
            const championNameMock = "fiora"
            const expectedFilePath = `src/test-data/champions/${championNameMock}/${championNameMock}.bin.json`

            const dataFetcher = localDataFetcher({})

            await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch(`Error loading champion data (${expectedFilePath}).`)
        })
    })

    it("Should throw on corrupted JSON schema", async () => {
        const championNameMock = "morgana"
        const expectedFilePath = `src/test-data/champions/${championNameMock}/${championNameMock}.bin.json`

        const dataFetcher = localDataFetcher({})

        await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch(`Error parsing champion data (${expectedFilePath}).`)
    })
    
    it("Should process parsed JSON", async () => {
        const championNameMock = "diana"

        const dataFetcher = localDataFetcher({})
        const parseResult = await dataFetcher.fetchChampionData(championNameMock)

        expect(parseChampionData).toBeCalledWith(dianaContentMock)
        expect(parseResult).toEqual(parsingResultMock)
    })
    
    it("Should use custom path if presented", async () => {
        const championNameMock = "missfortune"

        const dataFetcher = localDataFetcher({customUri: "src/test-data-custom/champions"})
        const parseResult = await dataFetcher.fetchChampionData(championNameMock)

        expect(parseChampionData).toBeCalledWith(mfContentMock)
        expect(parseResult).toEqual(parsingResultMock)
    })
})
