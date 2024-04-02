import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { NamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";

export const namedDataValueCalculationPart = (inputData: NamedDataValueCalculationPart, spellData: Spell): CalculationPart => {
    
    const dataValues = spellData.mDataValues.find(x => x.mName === inputData.mDataValue).mValues

    return {
        type: "NamedDataValueCalculationPart",
        getValue: (context: CalculationContext) => dataValues[context.spellLevel],
        getString: (context: CalculationContext) =>
            getPercent(dataValues[context.spellLevel], 3).toString()
    };
};
