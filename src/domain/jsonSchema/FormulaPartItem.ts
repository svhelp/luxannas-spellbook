import { ChampionStat } from "./ChampionStat"
import { ChampionStatFormula } from "./ChampionStatFormula"

export type FormulaPartItem =
    AbilityResourceByCoefficientCalculationPart |
    BuffCounterByCoefficientCalculationPart |
    BuffCounterByNamedDataValueCalculationPart |
    ByCharLevelBreakpointsCalculationPart |
    ByCharLevelInterpolationCalculationPart |
    ByCharLevelFormulaCalculationPart |
    ClampBySubpartCalculationPart |
    CooldownMultiplierCalculationPart |
    //CustomReductionMultiplierCalculationPart |
    EffectValueCalculationPart |
    //ItemsByRarityWithCoefficient |
    NamedDataValueCalculationPart |
    NumberCalculationPart |
    ProductOfSubPartsCalculationPart |
    StatByCoefficientCalculationPart |
    StatByNamedDataValueCalculationPart |
    StatBySubPartCalculationPart |
    //SubPartScaledProportionalToStat |
    SumOfSubPartsCalculationPart

// {f3cbe7b2} used only for Ksante Q skill, investigate

export type AbilityResourceByCoefficientCalculationPart = {
    __type: "AbilityResourceByCoefficientCalculationPart"
    mCoefficient: number
    mStatFormula?: ChampionStatFormula
}

export type BuffCounterByCoefficientCalculationPart = {
    __type: "BuffCounterByCoefficientCalculationPart"
    mCoefficient: number
    mBuffName: string // hashed value
    mScalingTagKey: string // not sure if needed
}

export type BuffCounterByNamedDataValueCalculationPart = {
    __type: "BuffCounterByNamedDataValueCalculationPart"
    mBuffName: string // hashed value
    mDataValue: string // hashed value possible
}

export type ByCharLevelBreakpointsCalculationPart = {
    __type: "ByCharLevelBreakpointsCalculationPart"
    mLevel1Value?: number
    '{02deb550}'?: number
    mBreakpoints?: Breakpoint[]
}

export type Breakpoint = {
    __type: 'Breakpoint'
    mLevel?: number
    '{57fdc438}'?: number // TODO: explore
    '{d5fd07ed}'?: number // TODO: explore
}

export type ByCharLevelFormulaCalculationPart = {
    __type: "ByCharLevelFormulaCalculationPart"
    mValues: number[]
}

export type ByCharLevelInterpolationCalculationPart = {
    __type: "ByCharLevelInterpolationCalculationPart"
    mStartValue: number
    mEndValue: number
    'a331f6bf'?: number // not sure what is it
}

// hashed name: {803dae4c}
export type ClampBySubpartCalculationPart = {
    __type: "{803dae4c}"
    mCeiling: number // null possible
    mFloor: number
    mSubparts: FormulaPartItem[]
}

export type CooldownMultiplierCalculationPart = {
    __type: "CooldownMultiplierCalculationPart"
}

export type EffectValueCalculationPart = {
    __type: "EffectValueCalculationPart"
    mEffectIndex: number
}

export type NamedDataValueCalculationPart = {
    __type: "NamedDataValueCalculationPart"
    mDataValue: string // hashed value possible
}

export type NumberCalculationPart = {
    __type: "NumberCalculationPart"
    mNumber: number
}

export type ProductOfSubPartsCalculationPart = { // recursive nesting possible
    __type: "ProductOfSubPartsCalculationPart"
    mPart1: FormulaPartItem
    mPart2: FormulaPartItem
}

export type StatByCoefficientCalculationPart = {
    __type: "StatByCoefficientCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mCoefficient: number
}

export type StatByNamedDataValueCalculationPart = {
    __type: "StatByNamedDataValueCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mDataValue: string // hashed value possible
}

export type StatBySubPartCalculationPart = {
    __type: "StatBySubPartCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mSubpart: FormulaPartItem
}

export type SumOfSubPartsCalculationPart = {
    __type: "SumOfSubPartsCalculationPart"
    mSubparts: FormulaPartItem[]
}
