import { FormulaPartItem } from "./FormulaPartItem"

export type SpellCalculation = GameCalculation | GameCalculationModified | GameCalculationConditional

type CalculationBase = {
    '{cbcac618}'?: number // investigate
    '{37070a8d}'?: number // investigate
    tooltipOnly?: boolean
}

export type GameCalculation = CalculationBase & {
    __type: "GameCalculation"
    mFormulaParts: FormulaPartItem[]
    mDisplayAsPercent?: boolean
    mMultiplier?: FormulaPartItem
    mPrecision?: number

    '{e6eebb2f}'?: number // investigate
    '{75a116d5}'?: number // Aurelion Sol only (== 1)
}

export type GameCalculationModified = CalculationBase & {
    __type: "GameCalculationModified"
    mModifiedGameCalculation: string // possible hashed value
    mMultiplier: FormulaPartItem

    '{e6eebb2f}'?: number // investigate
    mOverrideSpellLevel?: number // Akali Q only (== 5)
}

export type GameCalculationConditional = CalculationBase & {
    __type: "GameCalculationConditional"
    mDefaultGameCalculation: string // possible hashed value
    mConditionalGameCalculation: string // possible hashed value
    '{c0482365}': Condition
}

type Condition = {
    __type: 'HasBuffCastRequirement'
    mBuffName: string // hashed value
}
