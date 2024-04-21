import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { BuffCounterByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils";

export const buffCounterByNamedDataValueCalculationPart = (inputData: BuffCounterByNamedDataValueCalculationPart, spellData: Spell): CalculationPartProvider => {
    
    const dataValues = getDataValue(spellData, inputData.mDataValue)
    const buff = inputData.mBuffName
    const icon = inputData.mIconKey

    return {
        type: "BuffCounterByNamedDataValueCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "BuffCalculationPart",
                coefficient: dataValues[context.spellLevel],
                buff: icon ?? buff
            }
        ]
    };
};
