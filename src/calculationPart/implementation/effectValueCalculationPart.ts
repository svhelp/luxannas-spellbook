import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";
import { Spell } from "domain/jsonSchema/SpellData";

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart, spellData: Spell): CalculationPart => {

    const effectValues = spellData.mEffectAmount[inputData.mEffectIndex].value

    const getValue = (context: CalculationContext) => {
        // if (context.spellData.mEffectAmount.length < effectIndex + 1) {
        //     return 0
        // }

        return effectValues[context.spellLevel]
    }

    return {
        type: "EffectValueCalculationPart",
        getValue,
        getString: (context: CalculationContext) => {
            const value = getValue(context)

            return getPercent(value, 3).toString() // why 3
        }
    };
};
