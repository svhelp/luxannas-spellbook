import { SpellCalculation } from "./SpellCalculation"

export type SpellData = {
    mSpell: Spell
    __type: "SpellObject"
}

export type Spell = {
    mClientData: SpellClientData
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
    mHashedName?: string
    mValues?: number[]
    __type: "SpellDataValue"
}

type SpellClientData = {
    mTooltipData: TooltipData
}

type TooltipData = {
    mObjectName: string
}
