import { CalculationPart } from "calculation/calculationPart/implementation/CalculationPart"

const getItemToMerge = (resultArray: CalculationPart[], itemToMerge: CalculationPart) => {

    if (itemToMerge.type === "PlainCalculationPart") {
        return resultArray.find(x => x.type === "PlainCalculationPart")
    }

    if (itemToMerge.type === "BuffCalculationPart") {
        return resultArray.find(x => x.type === "BuffCalculationPart" && x.buff === itemToMerge.buff)
    }

    if (itemToMerge.type === "StatCalculationPart") {
        return resultArray.find(x =>
            x.type === "StatCalculationPart" &&
            x.statName === itemToMerge.statName &&
            x.formula === itemToMerge.formula)
    }
    
    return resultArray.find(x => x.type === itemToMerge.type)
}

const mergeItems = <T extends CalculationPart>(itemToMergeIn: T, itemToMergeFrom: T) => {

    if (itemToMergeIn.type === "PlainCalculationPart"
            && itemToMergeFrom.type === "PlainCalculationPart") {
        itemToMergeIn.value += itemToMergeFrom.value

        return
    }

    if (itemToMergeIn.type === "StatCalculationPart"
            && itemToMergeFrom.type === "StatCalculationPart" ||
        itemToMergeIn.type === "BuffCalculationPart"
            && itemToMergeFrom.type === "BuffCalculationPart") {
        itemToMergeIn.coefficient += itemToMergeFrom.coefficient
        
        return
    }

    throw new Error(`Unable to merge a ${itemToMergeFrom.type} type`)
}

export const mergeCalculationParts = (items: CalculationPart[]) => {
    const result: CalculationPart[] = []

    for (const item of items) {
        const itemToMerge = getItemToMerge(result, item)

        if (!itemToMerge) {
            result.push({ ...item })

            continue
        }

        mergeItems(itemToMerge, item)
    }

    return result
}