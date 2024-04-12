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
    SumOfSubPartsCalculationPart |
    KsanteQCalculationPart |
    UdyrCalculationPart

export type AbilityResourceByCoefficientCalculationPart = {
    __type: "AbilityResourceByCoefficientCalculationPart"
    mCoefficient: number
    mStatFormula?: ChampionStatFormula
}

export type BuffCounterByCoefficientCalculationPart = {
    __type: "BuffCounterByCoefficientCalculationPart"
    mCoefficient: number
    mBuffName: string // hashed value
    mIconKey?: string
    mScalingTagKey?: string // not sure if needed
}

export type BuffCounterByNamedDataValueCalculationPart = {
    __type: "BuffCounterByNamedDataValueCalculationPart"
    mBuffName: string // hashed value
    mIconKey?: string
    mDataValue: string
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
    // constant addition starting mLevel
    '{57fdc438}'?: number
    // single-time addition on mLevel
    '{d5fd07ed}'?: number
}

export type ByCharLevelFormulaCalculationPart = {
    __type: "ByCharLevelFormulaCalculationPart"
    mValues: number[]
}

export type ByCharLevelInterpolationCalculationPart = {
    __type: "ByCharLevelInterpolationCalculationPart"
    mStartValue: number
    mEndValue: number
    '{a331f6bf}'?: number // not sure what is it
}

// hashed name: {803dae4c}
export type ClampBySubpartCalculationPart = {
    __type: "{803dae4c}"
    mCeiling: number // null possible
    mFloor: number
    mSubparts: FormulaPartItem[]
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
    mNumber?: number // the value is null for KSante
}

export type ProductOfSubPartsCalculationPart = {
    __type: "ProductOfSubPartsCalculationPart"
    mPart1: FormulaPartItem
    mPart2: FormulaPartItem
}

export type StatByCoefficientCalculationPart = {
    __type: "StatByCoefficientCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mCoefficient?: number //Nilah's coefficient is null
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

// Presumably gameplay only parts

export type CooldownMultiplierCalculationPart = {
    __type: "CooldownMultiplierCalculationPart"
}

export type KsanteQCalculationPart = {
    __type: "{f3cbe7b2}"
    '{88536426}': string
}

export type UdyrCalculationPart = {
    __type: "{ea2ab5ca}"
    Coefficient: number
    buffName: string // hashed value
}
