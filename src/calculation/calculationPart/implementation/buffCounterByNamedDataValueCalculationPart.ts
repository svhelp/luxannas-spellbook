import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils/getDataValue";

export const buffCounterByNamedDataValueCalculationPart = (inputData: BuffCounterByNamedDataValueCalculationPart, spellData: Spell): CalculationPart => {
    
    const dataValues = getDataValue(spellData, inputData.mDataValue)
    const buff = inputData.mBuffName

    const getValue = (context: CalculationContext) => {
        const value = dataValues[context.spellLevel]

        return getPercent(value)
    }

    return {
        type: "BuffCounterByNamedDataValueCalculationPart",
        getValue,
        getString: (context: CalculationContext) => `${getValue(context)}% ${buff}`
    };
};
