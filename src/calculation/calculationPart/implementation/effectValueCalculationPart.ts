import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";

const percentThreshold = 5 // why 5

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart, spellData: Spell): CalculationPartProvider => {

    const effectValues = spellData.mEffectAmount?.[inputData.mEffectIndex-1]?.value ?? [ 0, 0, 0, 0, 0 ]

    return {
        type: "EffectValueCalculationPart",
        getValue: (context: CalculationContext) => effectValues[context.spellLevel],
        getString: (context: CalculationContext) =>
            getPercent(effectValues[context.spellLevel], percentThreshold).toString(),
        getItems: (context: CalculationContext) => [
            {
                type: "PlainCalculationPart",
                value: effectValues[context.spellLevel]
            }
        ]
    };
};
