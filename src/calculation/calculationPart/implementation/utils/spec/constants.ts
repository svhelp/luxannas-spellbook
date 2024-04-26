import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart"
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula"

export const plainPartsMock: CalculationPart[] = [
    {
        type: "PlainCalculationPart",
        value: 10
    },
    {
        type: "PlainCalculationPart",
        value: 50
    },
]

export const mergedPlainParts: CalculationPart[] = [
    {
        type: "PlainCalculationPart",
        value: 60
    }
]

export const buffPartsMock: CalculationPart[] = [
    {
        type: "BuffCalculationPart",
        coefficient: 5,
        buff: "buff1"
    },
    {
        type: "BuffCalculationPart",
        coefficient: 15,
        buff: "buff1"
    },
    {
        type: "BuffCalculationPart",
        coefficient: 30,
        buff: "buff2"
    }
]

export const mergedBuffParts: CalculationPart[] = [
    {
        type: "BuffCalculationPart",
        coefficient: 20,
        buff: "buff1"
    },
    {
        type: "BuffCalculationPart",
        coefficient: 30,
        buff: "buff2"
    }
]

export const resourceStatPartMock: CalculationPart[] = [
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Base,
        statName: "resourceMax",
    },
]

export const statPartsMock: CalculationPart[] = [
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Base,
        statName: "armor",
    },
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Base,
        statName: "abilityPower",
    },
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Bonus,
        statName: "armor",
    },
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Base,
        statName: "armor",
    },
]

export const mergedStatParts: CalculationPart[] = [
    {
        type: "StatCalculationPart",
        coefficient: 2,
        formula: ChampionStatFormula.Base,
        statName: "armor",
    },
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Base,
        statName: "abilityPower",
    },
    {
        type: "StatCalculationPart",
        coefficient: 1,
        formula: ChampionStatFormula.Bonus,
        statName: "armor",
    },
]

export const levelPartsMock: CalculationPart[] = [
    {
        type: "LevelCalculationPart",
        value: 10,
        min: 5,
        max: 20,
    },
]

export const wrongLevelPartsMock: CalculationPart[] = [
    {
        type: "LevelCalculationPart",
        value: 1,
        min: 0,
        max: 10,
    },
    {
        type: "LevelCalculationPart",
        value: 10,
        min: 0,
        max: 10,
    },
]

export const complexPartsArrayMock = [
    ...plainPartsMock,
    ...buffPartsMock,
    ...statPartsMock,
    ...levelPartsMock
]

export const mergedComplexPartsArray = [
    ...mergedPlainParts,
    ...mergedBuffParts,
    ...mergedStatParts,
    ...levelPartsMock
]

export const partsMultipliedBy2 = [
    {
        type: "PlainCalculationPart",
        value: 120
    },
    {
        type: "BuffCalculationPart",
        coefficient: 40,
        buff: "buff1"
    },
    {
        type: "BuffCalculationPart",
        coefficient: 60,
        buff: "buff2"
    },
    {
        type: "StatCalculationPart",
        coefficient: 4,
        formula: ChampionStatFormula.Base,
        statName: "armor",
    },
    {
        type: "StatCalculationPart",
        coefficient: 2,
        formula: ChampionStatFormula.Base,
        statName: "abilityPower",
    },
    {
        type: "StatCalculationPart",
        coefficient: 2,
        formula: ChampionStatFormula.Bonus,
        statName: "armor",
    },
    {
        type: "LevelCalculationPart",
        value: 20,
        min: 10,
        max: 40,
    }
]

export const partsMultipliedBy10 = [
    {
        type: "PlainCalculationPart",
        value: 600
    },
    {
        type: "BuffCalculationPart",
        coefficient: 200,
        buff: "buff1"
    },
    {
        type: "BuffCalculationPart",
        coefficient: 300,
        buff: "buff2"
    },
    {
        type: "StatCalculationPart",
        coefficient: 20,
        formula: ChampionStatFormula.Base,
        statName: "armor",
    },
    {
        type: "StatCalculationPart",
        coefficient: 10,
        formula: ChampionStatFormula.Base,
        statName: "abilityPower",
    },
    {
        type: "StatCalculationPart",
        coefficient: 10,
        formula: ChampionStatFormula.Bonus,
        statName: "armor",
    },
    {
        type: "LevelCalculationPart",
        value: 100,
        min: 50,
        max: 200,
    }
]
