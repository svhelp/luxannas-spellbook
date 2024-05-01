import "./mock"
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { webDataFetcher } from "../webDataFetcher";
import { handlers } from "./handlers";
import { parseChampionData } from "../../../parsers";
import { dianaContentMock, mfContentMock, parsingResultMock } from "./constants";

const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

describe("webDataFetcher", () => {
    it("Should return its type", () => {
        const dataFetcher = webDataFetcher({})

        expect(dataFetcher.type).toEqual("WebDataFetcher")
    })
    
    it("Should throw on resource not found", async () => {
        const championNameMock = "wrong_diana"
        
        const dataFetcher = webDataFetcher({})

        await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch("Error loading champion data.")
    })

    it("Should throw on network error", async () => {
        const championNameMock = "wrong_morgana"

        const dataFetcher = webDataFetcher({})

        await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch("Unexpected network error while loading champion data.")
    })

    it("Should throw on corrupted JSON schema", async () => {
        const championNameMock = "morgana"
        const expectedFilePath = `https://raw.communitydragon.org/latest/game/data/characters/${championNameMock}/${championNameMock}.bin.json`

        const dataFetcher = webDataFetcher({})

        await expect(dataFetcher.fetchChampionData(championNameMock)).rejects.toMatch(`Error parsing champion data (${expectedFilePath}).`)
    })
    
    it("Should process parsed JSON", async () => {
        const championNameMock = "diana"

        const dataFetcher = webDataFetcher({})
        const parseResult = await dataFetcher.fetchChampionData(championNameMock)

        expect(parseChampionData).toBeCalledWith(dianaContentMock)
        expect(parseResult).toEqual(parsingResultMock)
    })
    
    it("Should use custom path if presented", async () => {
        const championNameMock = "missfortune"

        const dataFetcher = webDataFetcher({customUri: "https://communitydragon-custom.org"})
        const parseResult = await dataFetcher.fetchChampionData(championNameMock)

        expect(parseChampionData).toBeCalledWith(mfContentMock)
        expect(parseResult).toEqual(parsingResultMock)
    })
})
