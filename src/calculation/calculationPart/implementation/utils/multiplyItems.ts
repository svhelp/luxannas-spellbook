import { CalculationPart } from "domain/CalculationPart";
import { mergeCalculationParts } from "./mergeCalculationParts";

export const multiplyItems = (items: CalculationPart[], multiplier?: number) => {
    const mergedItems = mergeCalculationParts(items)
    const itemsMultiplier = multiplier ?? 1

    for (const item of mergedItems) {
        if (item.type === "PlainCalculationPart") {
            item.value *= itemsMultiplier
            continue
        }
        
        if (item.type === "StatCalculationPart") {
            item.coefficient *= itemsMultiplier
            continue
        }
        
        if (item.type === "LevelCalculationPart") {
            item.max *= itemsMultiplier
            item.min *= itemsMultiplier
            item.value *= itemsMultiplier
            continue
        }
        
        if (item.type === "BuffCalculationPart") {
            item.coefficient *= itemsMultiplier
            continue
        }

        throw new Error("Unsupported calculation part")
    }

    return mergedItems
}
