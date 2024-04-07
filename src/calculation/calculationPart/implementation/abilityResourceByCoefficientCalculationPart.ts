import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatFormulaName } from "./utils/ChampionStatFormulaName";
import { ResourceTypeName } from "./utils/ResourceTypeName";

export const abilityResourceByCoefficientCalculationPart = (inputData: AbilityResourceByCoefficientCalculationPart): CalculationPart => {

    const coefficient = inputData.mCoefficient
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Base

    return {
        type: "AbilityResourceByCoefficientCalculationPart",
        getValue: (context: CalculationContext) => coefficient * getStat(context, "resourceMax", formula),
        getString: (context: CalculationContext) => {
            const resourceType = getStat(context, "resourceType")

            return `${(coefficient * 100).toFixed()}% @${ChampionStatFormulaName[formula]}@ @${ResourceTypeName[resourceType]}@`
        }
    };
};
