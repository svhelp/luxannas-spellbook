import { jest } from "@jest/globals";
import { parsingResultMock } from "./constants";

jest.mock('../../parsers/parseChampionData', () => ({
    parseChampionData: jest.fn().mockImplementation(() => parsingResultMock)
}));
