import { ChampionStatFormula } from "./jsonSchema/ChampionStatFormula"
import { ChampionStats, NonCountableStats } from "./riotApiSchema/ChampionStats"

export type CalculationPart = PlainCalculationPart | StatCalculationPart | BuffCalculationPart | LevelCalculationPart

export type PlainCalculationPart = {
    type: "PlainCalculationPart"
    value: number
}

export type StatCalculationPart = {
    type: "StatCalculationPart"
    coefficient: number
    formula: ChampionStatFormula
    statName: keyof ChampionStats | keyof NonCountableStats
}

export type BuffCalculationPart = {
    type: "BuffCalculationPart"
    coefficient: number
    buff: string
}

export type LevelCalculationPart = {
    type: "LevelCalculationPart"
    value: number
    min: number
    max: number
}
