import { parseCalculationPart } from "../calculationPart";
import { CalculationContext } from "domain/CalculationContext";
import { GameCalculation } from "domain/jsonSchema/SpellCalculation";
import { Spell } from "domain/jsonSchema/SpellData";

export const gameCalculation = (spell: Spell, calculationData: GameCalculation, championName: string) => {
    const parts = calculationData.mFormulaParts.map(x => {
        const calculation = parseCalculationPart(spell, x)
    
        if (calculation.type === "StatByCoefficientCalculationPart") {
            //console.log(championName)
        }

        return calculation
    })
    
    return {
        type: "GameCalculation",
        getValue: (context: CalculationContext) => {
            return parts.reduce((acc, item) => acc + item.getValue(context), 0)
        },
        getString: (context: CalculationContext) => {
            return parts.map(item => item.getString(context)).join(" + ")
        }
    };
}
