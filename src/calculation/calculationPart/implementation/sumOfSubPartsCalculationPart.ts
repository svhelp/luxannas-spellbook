import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart, PlainCalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";

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

    throw new Error(`Unable to merge a ${itemToMerge.type} type`)
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

export const sumOfSubPartsCalculationPart = (subparts: CalculationPartProvider[]): CalculationPartProvider => {
    return {
        type: "SumOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => subparts.reduce((accumulator, currentValue) => accumulator + currentValue.getValue(context), 0),
        getString: (context: CalculationContext) => subparts.map(x => x.getString(context)).join(" + "),
        getItems: (context: CalculationContext) => {
            const result: CalculationPart[] = []

            for (const subpart of subparts) {
                for (const item of subpart.getItems(context)) {
                    const itemToMerge = getItemToMerge(result, item)

                    if (!itemToMerge) {
                        result.push(item)

                        continue
                    }

                    mergeItems(itemToMerge, item)
                }
            }

            return result
        }
    };
};
