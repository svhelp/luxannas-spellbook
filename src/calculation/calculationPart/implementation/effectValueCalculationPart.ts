import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
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
