import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPart, LevelCalculationPart, PlainCalculationPart, StatCalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { getStat } from "./getStat";
import { mergeCalculationParts } from "./mergeCalculationParts";

export const calculateValueByParts = (context: CalculationContext, items: CalculationPart[]) => {
    let value = 0
    const mergedItems = mergeCalculationParts(items)

    const plainItem = mergedItems.find(i => i.type === "PlainCalculationPart") as PlainCalculationPart

    if (plainItem) {
        value += plainItem.value
    }

    const levelItem = mergedItems.find(i => i.type === "LevelCalculationPart") as LevelCalculationPart
    
    if (levelItem) {
        value += levelItem.value
    }

    const statItems = mergedItems.filter(i => i.type === "StatCalculationPart") as StatCalculationPart[]

    for (const statItem of statItems) {
        value += statItem.coefficient * getStat(context, statItem.statName, statItem.formula)
    }

    return value
}
