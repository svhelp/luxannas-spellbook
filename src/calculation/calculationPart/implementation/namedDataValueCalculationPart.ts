import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils";

export const namedDataValueCalculationPart = (inputData: NamedDataValueCalculationPart, spellData: Spell): CalculationPartProvider => {

    const dataValues = getDataValue(spellData, inputData.mDataValue)

    return {
        type: "NamedDataValueCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "PlainCalculationPart",
                value: dataValues[context.spellLevel]
            }
        ]
    };
};
