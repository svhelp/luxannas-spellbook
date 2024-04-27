import { Spell } from "domain/jsonSchema/SpellData";
import { FormulaPartItem } from "domain/jsonSchema/FormulaPartItem";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { jest } from "@jest/globals";
import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart";

export const contextMock: CalculationContext = {
    championLevel: 5,
    spellLevel: 1,
    
    currentStats: undefined,
    baseStats: undefined
}

export const spellMock: Spell = {
    __type: "SpellDataResource",
    mClientData: {
        mTooltipData: {
            mObjectName: "string"
        }
    }
}

export const numberCalculationPartDataMock: FormulaPartItem = {
    __type: "NumberCalculationPart",
    mNumber: 1
}

export const numberCalculationItemMock: CalculationPart = {
    type: "PlainCalculationPart",
    value: 1
}

export const numberCalculationPartMock: CalculationPartProvider = {
    type: "NumberCalculationPart",
    getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(() => [ numberCalculationItemMock ])
}

export const namedDataValueCalculationPartDataMock: FormulaPartItem = {
    __type: "NamedDataValueCalculationPart",
    mDataValue: "value name mock"
}

export const namedDataValueCalculationItemMock: CalculationPart = {
    type: "PlainCalculationPart",
    value: 5
}

export const namedDataValueCalculationPartMock: CalculationPartProvider = {
    type: "NamedDataValueCalculationPart",
    getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(() => [ namedDataValueCalculationItemMock ])
}

export const partItemsMock: FormulaPartItem[] = [
    numberCalculationPartDataMock,
    namedDataValueCalculationPartDataMock
]

export const multiplierDataMock: FormulaPartItem = {
    __type: "EffectValueCalculationPart",
    mEffectIndex: 4
}

export const multiplierItemMock: CalculationPart = {
    type: "PlainCalculationPart",
    value: 5
}

export const multiplierPartMock: CalculationPartProvider = {
    type: "NamedDataValueCalculationPart",
    getItems: jest.fn<(context: CalculationContext) => CalculationPart[]>().mockImplementation(() => [ multiplierItemMock ])
}

export const nonCountableMultiplierDataMock: FormulaPartItem = {
    __type: "CooldownMultiplierCalculationPart"
}

export const nonCountableMultiplierPartMock: CalculationPartProvider = {
    type: "CooldownMultiplierCalculationPart",
    getItems: () => []
}

export const defaultMultiplierDataMock: FormulaPartItem = {
    __type: "NumberCalculationPart",
    mNumber: 1
}

export const defaultMultiplierPartMock: CalculationPartProvider = {
    type: "NamedDataValueCalculationPart",
    getItems: () => [
        {
            type: "PlainCalculationPart",
            value: 1
        }
    ]
}

export const multipliedPartItemsMock: CalculationPart[] = [
    {
        type: "PlainCalculationPart",
        value: 5
    },
    {
        type: "PlainCalculationPart",
        value: 25
    }
]

export const plainResultsMock = [
    {
        name: "result1",
        items: [
            numberCalculationItemMock, 
            namedDataValueCalculationItemMock,
        ]
    }
]
