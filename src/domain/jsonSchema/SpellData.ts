import { FormulaPartItem } from "./FormulaPartItem"

export type SpellData = {
    mSpell: Spell
    __type: "SpellObject"
}

export type Spell = {
    mEffectAmount?: EffectAmountItem[]
    mDataValues?: DataValueItem[]
    mSpellCalculations?: {
        [key: string]: SpellCalculation
    }
    __type: "SpellDataResource"
}

type EffectAmountItem = {
    value?: number[]
    __type: "SpellEffectAmount"
}

type DataValueItem = {
    mName: string
    mValues: number[]
    __type: "SpellDataValue"
}

type SpellCalculation = {
    mDisplayAsPercent?: boolean
    mFormulaParts: FormulaPartItem[]
    mMultiplier?: any
    __type: "GameCalculation" | "GameCalculationModified" | "GameCalculationConditional" // to investigate differencies
}
