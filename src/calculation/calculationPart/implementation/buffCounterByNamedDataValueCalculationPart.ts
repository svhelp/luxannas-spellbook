import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils";

export const buffCounterByNamedDataValueCalculationPart = (inputData: BuffCounterByNamedDataValueCalculationPart, spellData: Spell): CalculationPartProvider => {
    
    const dataValues = getDataValue(spellData, inputData.mDataValue)
    const buff = inputData.mBuffName
    const icon = inputData.mIconKey

    return {
        type: "BuffCounterByNamedDataValueCalculationPart",
        getValue: (context: CalculationContext) => 0,
        getString: (context: CalculationContext) => `${(dataValues[context.spellLevel] * 100).toFixed()}% @${icon ?? buff}@`
    };
};
