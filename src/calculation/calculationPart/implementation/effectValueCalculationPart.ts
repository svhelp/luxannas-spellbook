import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { Spell } from "domain/jsonSchema/SpellData";

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart, spellData: Spell): CalculationPartProvider => {

    const effectValues = spellData.mEffectAmount?.[inputData.mEffectIndex-1]?.value ?? [ 0, 0, 0, 0, 0 ]

    return {
        type: "EffectValueCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "PlainCalculationPart",
                value: effectValues[context.spellLevel]
            }
        ]
    };
};
