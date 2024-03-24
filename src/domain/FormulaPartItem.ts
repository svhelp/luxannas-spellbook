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
    //CooldownMultiplierCalculationPart |
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

type AbilityResourceByCoefficientCalculationPart = {
    __type: "AbilityResourceByCoefficientCalculationPart"
    mCoefficient: number
    mStatFormula?: number
}

type BuffCounterByCoefficientCalculationPart = {
    __type: "BuffCounterByCoefficientCalculationPart"
    mCoefficient: number
    mBuffName: string // hashed value
    mScalingTagKey: string // not sure if needed
}

type BuffCounterByNamedDataValueCalculationPart = {
    __type: "BuffCounterByNamedDataValueCalculationPart"
    mCoefficient: number
    mBuffName: string // hashed value
    mDataValue: string // hashed value possible
}

type ByCharLevelBreakpointsCalculationPart = {
    __type: "ByCharLevelBreakpointsCalculationPart"
    mLevel1Value: number
    '02deb550'?: number
    mBreakpoints?: Breakpoint[]
}

type Breakpoint = {[key: string]: number} & { // always hashed field name TODO: explore
    __type: 'Breakpoint'
    mLevel: number
}

type ByCharLevelFormulaCalculationPart = {
    __type: "ByCharLevelFormulaCalculationPart"
    mValues: number[]
}

type ByCharLevelInterpolationCalculationPart = {
    __type: "ByCharLevelInterpolationCalculationPart"
    mStartValue: number
    mEndValue: number
    'a331f6bf'?: number // not sure what is it
}

// hashed name: {803dae4c}
type ClampBySubpartCalculationPart = {
    __type: "{803dae4c}"
    mCeiling: number // null possible
    mFloor: number
    mSubparts: FormulaPartItem[]
}

type EffectValueCalculationPart = {
    __type: "EffectValueCalculationPart"
    mEffectIndex: number
}

type NamedDataValueCalculationPart = {
    __type: "NamedDataValueCalculationPart"
    mDataValue: string // hashed value possible
}

type NumberCalculationPart = {
    __type: "NumberCalculationPart"
    mNumber: number
}

type ProductOfSubPartsCalculationPart = { // recursive nesting possible
    __type: "ProductOfSubPartsCalculationPart"
    mPart1: FormulaPartItem
    mPart2: FormulaPartItem
}

type StatByCoefficientCalculationPart = {
    __type: "StatByCoefficientCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mCoefficient: number
}

type StatByNamedDataValueCalculationPart = {
    __type: "StatByNamedDataValueCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mDataValue: string // hashed value possible
}

type StatBySubPartCalculationPart = {
    __type: "StatBySubPartCalculationPart"
    mStat?: ChampionStat
    mStatFormula?: ChampionStatFormula
    mSubpart: FormulaPartItem
}

type SumOfSubPartsCalculationPart = {
    __type: "SumOfSubPartsCalculationPart"
    mSubparts: FormulaPartItem[]
}
