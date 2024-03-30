import { describe, expect, it } from "@jest/globals";
import { parseChampionData } from "../parseChampionData";

describe("parseChampionData", () => {
    it("Should fail on root key not found", () => {
        const jsonDataMock = {}

        expect(() => parseChampionData(jsonDataMock)).toThrow("Root champion data not found")
    })
    
    it("Should fail on passive spell key not found", () => {
        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": {}
        }

        expect(() => parseChampionData(jsonDataMock)).toThrow("Passive spell data not found")
    })
    
    it("Should fail on passive spell data not found", () => {
        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": {
                mCharacterPassiveSpell: "PassiveKeyMock"
            }
        }

        expect(() => parseChampionData(jsonDataMock)).toThrow("Passive spell data not found")
    })

    it("Should fail on spell names not found", () => {
        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": {
                mCharacterPassiveSpell: "PassiveKeyMock"
            },
            "PassiveKeyMock": {
                mSpell: {}
            }
        }

        expect(() => parseChampionData(jsonDataMock)).toThrow()
    })
    
    it("Should fail on spell data not found", () => {
        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": {
                mCharacterPassiveSpell: "PassiveKeyMock",
                spellNames: [
                    "Skill1"
                ]
            },
            "PassiveKeyMock": {
                mSpell: {}
            }
        }

        expect(() => parseChampionData(jsonDataMock)).toThrow("Skill1 spell key extraction error")
    })
    
    it("Should fail on ambiguous spell data", () => {
        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": {
                mCharacterPassiveSpell: "PassiveKeyMock",
                spellNames: [
                    "Skill1"
                ]
            },
            "PassiveKeyMock": {
                mSpell: {}
            },
            "Characters/Diana/Spells/Skill1": {
                mSpell: {}
            },
            "Characters/Ahri/Spells/Skill1": {
                mSpell: {}
            }
        }

        expect(() => parseChampionData(jsonDataMock)).toThrow("Skill1 spell key extraction error")
    })
    
    it("Should parse data on happy path", () => {

        const rootDataMock = {
            mCharacterPassiveSpell: "PassiveKeyMock",
            spellNames: [
                "Skill1"
            ]
        }

        const passiveSpellMock = {}
        const spell1Mock = {}

        const jsonDataMock = {
            "Characters/Diana/CharacterRecords/Root": rootDataMock,
            "PassiveKeyMock": {
                mSpell: passiveSpellMock
            },
            "Characters/Diana/Spells/Skill1": {
                mSpell: spell1Mock
            },
        }

        const parsedData = parseChampionData(jsonDataMock)

        expect(parsedData.rootChampionData).toEqual(rootDataMock)
        expect(parsedData.passiveSpellData).toEqual(passiveSpellMock)
        expect(parsedData.spellsData[0]).toEqual(spell1Mock)
    })
})
