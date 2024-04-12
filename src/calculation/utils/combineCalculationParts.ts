import { ResourceTypeName } from "../calculationPart/implementation/utils/ResourceTypeName";
import { getStat } from "../calculationPart/implementation/utils";
import { ChampionStatFormulaName } from "../calculationPart/implementation/utils/ChampionStatFormulaName";
import { CalculationContext } from "domain/CalculationContext";
import { BuffCalculationPart, CalculationPart, LevelCalculationPart, PlainCalculationPart, StatCalculationPart } from "domain/CalculationPart";
import { mergeCalculationParts } from "../calculationPart/implementation/utils/mergeCalculationParts";

export const combineCalculationParts = (context: CalculationContext, items: CalculationPart[]) => {
    let value = 0
    const furmulaItems: string[] = []
    const mergedItems = mergeCalculationParts(items)

    const plainItem = mergedItems.find(i => i.type === "PlainCalculationPart") as PlainCalculationPart

    if (plainItem) {
        value += plainItem.value

        furmulaItems.push(value.toFixed())
    }

    const levelItem = mergedItems.find(i => i.type === "LevelCalculationPart") as LevelCalculationPart
    
    if (levelItem) {
        value += levelItem.value
        
        furmulaItems.push(`${levelItem.min.toFixed()} - ${levelItem.max.toFixed()}`)
    }

    const statItems = mergedItems.filter(i => i.type === "StatCalculationPart") as StatCalculationPart[]

    for (const statItem of statItems) {
        value += statItem.coefficient * getStat(context, statItem.statName, statItem.formula)

        const statName = statItem.statName === "resourceMax"
            ? ResourceTypeName[getStat(context, "resourceType")]
            : statItem.statName
        
        furmulaItems.push(`${(statItem.coefficient * 100).toFixed()}% @${ChampionStatFormulaName[statItem.formula]}@ @${statName}@`)
    }

    const buffItems = mergedItems.filter(i => i.type === "BuffCalculationPart") as BuffCalculationPart[]

    for (const buffItem of buffItems) {
        furmulaItems.push(`${(buffItem.coefficient * 100).toFixed()}% @${buffItem.buff}@`)
    }

    return {
        value,
        furmula: furmulaItems.join(" + ")
    }
}