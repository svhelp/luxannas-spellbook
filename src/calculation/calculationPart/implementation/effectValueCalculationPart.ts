import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";

const percentThreshold = 5 // why 5

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart, spellData: Spell): CalculationPart => {

    const effectValues = spellData.mEffectAmount?.[inputData.mEffectIndex]?.value ?? [ 0, 0, 0, 0, 0 ]

    return {
        type: "EffectValueCalculationPart",
        getValue: (context: CalculationContext) => effectValues[context.spellLevel],
        getString: (context: CalculationContext) =>
            getPercent(effectValues[context.spellLevel], percentThreshold).toString()
    };
};