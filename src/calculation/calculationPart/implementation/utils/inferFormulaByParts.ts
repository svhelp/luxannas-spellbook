import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { BuffCalculationPart, CalculationPart, LevelCalculationPart, PlainCalculationPart, StatCalculationPart } from "calculation/calculationPart/implementation/CalculationPart";
import { mergeCalculationParts } from "./mergeCalculationParts";
import { ResourceTypeName, ChampionStatFormulaName } from "../domain";
import { getStat } from "./getStat";

export const inferFormulaByParts = (context: CalculationContext, items: CalculationPart[]) => {
    const furmulaItems: string[] = []
    const mergedItems = mergeCalculationParts(items)

    const plainItem = mergedItems.find(i => i.type === "PlainCalculationPart") as PlainCalculationPart

    if (plainItem) {
        furmulaItems.push((plainItem.value).toFixed())
    }

    const levelItem = mergedItems.find(i => i.type === "LevelCalculationPart") as LevelCalculationPart
    
    if (levelItem) {
        furmulaItems.push(`${levelItem.min.toFixed()} - ${levelItem.max.toFixed()} @level@`)
    }

    const statItems = mergedItems.filter(i => i.type === "StatCalculationPart") as StatCalculationPart[]

    for (const statItem of statItems) {
        const statName = statItem.statName === "resourceMax"
            ? ResourceTypeName[getStat(context, "resourceType")]
            : statItem.statName
        
        furmulaItems.push(`${(statItem.coefficient * 100).toFixed()}% @${ChampionStatFormulaName[statItem.formula]}@ @${statName}@`)
    }

    const buffItems = mergedItems.filter(i => i.type === "BuffCalculationPart") as BuffCalculationPart[]

    for (const buffItem of buffItems) {
        furmulaItems.push(`${(buffItem.coefficient * 100).toFixed()}% @${buffItem.buff}@`)
    }

    return furmulaItems.join(" + ")
}