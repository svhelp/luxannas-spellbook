import { describe, expect, it } from "@jest/globals";
import { webDataFetcher } from "../webDataFetcher";

describe("webDataFetcher", () => {
    it("Should return its type", () => {
        const dataFetcher = webDataFetcher({})

        expect(dataFetcher.type).toEqual("WebDataFetcher")
    })
})
