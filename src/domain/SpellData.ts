import { FormulaPartItem } from "./FormulaPartItem"

export interface SpellData {
    mSpell: Spell
}

export interface Spell {
    mEffectAmount?: EffectAmountItem[]
    mDataValues?: EffectAmountItem[]
    mSpellCalculations?: {
        [key: string]: SpellCalculation
    }
}

interface EffectAmountItem extends ITypedValue {
    value?: number[]
}

interface EffectAmountItem extends ITypedValue {
    mName: string
    mValues: number[]
}

interface ITypedValue {
    __type: string
}

interface SpellCalculation {
    __type: "GameCalculation" | "GameCalculationModified" | "GameCalculationConditional" // to investigate differencies
    mDisplayAsPercent?: boolean
    mFormulaParts: FormulaPartItem[]
    mMultiplier?: any
}
