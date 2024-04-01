import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { EffectValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getPercent } from "./utils/getPercent";

export const effectValueCalculationPart = (inputData: EffectValueCalculationPart): CalculationPart => {

    const effectIndex = inputData.mEffectIndex

    const getValue = (context: CalculationContext) => {
        if (context.spellData.mEffectAmount.length < effectIndex + 1) {
            return 0
        }

        return context.spellData.mEffectAmount[effectIndex].value[context.spellLevel]
    }

    return {
        getValue,
        getString: (context: CalculationContext) => {
            const value = getValue(context)

            return getPercent(value, 3).toString() // why 3
        }
    };
};
