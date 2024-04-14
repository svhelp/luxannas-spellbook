import { FormulaPartItem } from "./FormulaPartItem"

export type SpellCalculation = GameCalculation | GameCalculationModified | GameCalculationConditional

export type GameCalculation = {
    mDisplayAsPercent?: boolean
    mFormulaParts: FormulaPartItem[]
    mMultiplier?: FormulaPartItem
    mPrecision?: number
    __type: "GameCalculation"
}

export type GameCalculationModified = {
    mModifiedGameCalculation: string //possible hashed value
    mMultiplier: FormulaPartItem

    // investigate some hashed fields

    __type: "GameCalculationModified"
}

export type GameCalculationConditional = {
    '{cbcac618}'?: number // investigate
    '{37070a8d}'?: number // investigate
    mDefaultGameCalculation: string //possible hashed value
    mConditionalGameCalculation: string //possible hashed value
    '{c0482365}': Condition
    __type: "GameCalculationConditional"
}

type Condition = {
    mBuffName: string //possible hashed value
    __type: 'HasBuffCastRequirement'
}
