import { combineCalculationParts } from "../../utils/combineCalculationParts";
import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart, PlainCalculationPart } from "domain/CalculationPart";
import { CalculationPartProvider } from "domain/CalculationPartProvider";

const extractPartRoles = (coefficienItems: PlainCalculationPart[], productItems: CalculationPart[]) => {
    const coefficient = coefficienItems.length === 1
        ? coefficienItems[0].value
        : 1

    return { coefficient, productItems }
}

const decideOnPartRoles = (subItems1: CalculationPart[], subItems2: CalculationPart[]) => {
    if (subItems1.length < 2 && subItems1.every(x => x.type === "PlainCalculationPart")) {
        return extractPartRoles(subItems1 as PlainCalculationPart[], subItems2)
    }
    
    if (subItems2.length < 2 && subItems2.every(x => x.type === "PlainCalculationPart")) {
        return extractPartRoles(subItems2 as PlainCalculationPart[], subItems1)
    }

    return null
}

export const productOfSubPartsCalculationPart = (part1: CalculationPartProvider, part2: CalculationPartProvider): CalculationPartProvider => {
    return {
        type: "ProductOfSubPartsCalculationPart",
        getValue: (context: CalculationContext) => part1.getValue(context) * part2.getValue(context),
        getString: (context: CalculationContext) => `${part1.getString(context)} * ${part2.getString(context)}`,
        getItems: (context: CalculationContext) => {
            const subItems1 = part1.getItems(context)
            const subItems2 = part2.getItems(context)

            const partRoles = decideOnPartRoles(subItems1, subItems2)

            if (!partRoles) {
                return [
                    {
                        type: "PlainCalculationPart",
                        value: combineCalculationParts(context, subItems1).value * combineCalculationParts(context, subItems2).value
                    }
                ]
            }

            const { coefficient, productItems } = partRoles

            for (const productItem of productItems) {
                if (productItem.type === "PlainCalculationPart") {
                    productItem.value *= coefficient
                }

                if (productItem.type === "StatCalculationPart" || productItem.type === "BuffCalculationPart") {
                    productItem.coefficient *= coefficient
                }

                if (productItem.type === "LevelCalculationPart") {
                    productItem.value *= coefficient
                    productItem.min *= coefficient
                    productItem.max *= coefficient
                }
            }

            return productItems
        }
    };
};
