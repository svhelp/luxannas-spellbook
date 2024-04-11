import { getStat } from "../calculationPart/implementation/utils";
import { ChampionStatFormulaName } from "../calculationPart/implementation/utils/ChampionStatFormulaName";
import { CalculationContext } from "domain/CalculationContext";
import { BuffCalculationPart, CalculationPart, LevelCalculationPart, PlainCalculationPart, StatCalculationPart } from "domain/CalculationPart";

export const combineCalculationParts = (context: CalculationContext, items: CalculationPart[]) => {
    let value = 0
    const furmulaItems: string[] = []

    const plainItem = items.find(i => i.type === "PlainCalculationPart") as PlainCalculationPart

    if (plainItem) {
        value += plainItem.value

        furmulaItems.push(value.toFixed())
    }

    const levelItem = items.find(i => i.type === "LevelCalculationPart") as LevelCalculationPart
    
    if (levelItem) {
        value += levelItem.value
        
        furmulaItems.push(`${levelItem.min.toFixed()} - ${levelItem.max.toFixed()}`)
    }

    const statItems = items.filter(i => i.type === "StatCalculationPart") as StatCalculationPart[]

    for (const statItem of statItems) {
        value += statItem.coefficient * getStat(context, statItem.statName, statItem.formula)
        
        furmulaItems.push(`${(statItem.coefficient * 100).toFixed()}% @${ChampionStatFormulaName[statItem.formula]}@ @${statItem.statName}@`)
    }

    const buffItems = items.filter(i => i.type === "BuffCalculationPart") as BuffCalculationPart[]

    for (const buffItem of buffItems) {
        furmulaItems.push(`${(buffItem.coefficient * 100).toFixed()}% @${buffItem.buff}@`)
    }

    return {
        value,
        furmula: furmulaItems.join(" + ")
    }
}