import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils";

const percentThreshold = 5 // why 5

export const namedDataValueCalculationPart = (inputData: NamedDataValueCalculationPart, spellData: Spell): CalculationPart => {

    const dataValues = getDataValue(spellData, inputData.mDataValue)

    return {
        type: "NamedDataValueCalculationPart",
        getValue: (context: CalculationContext) => dataValues[context.spellLevel],
        getString: (context: CalculationContext) => dataValues[context.spellLevel].toString()
            //getPercent(dataValues[context.spellLevel], percentThreshold).toString()
    };
};
