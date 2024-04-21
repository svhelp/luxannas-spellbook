import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { AbilityResourceByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

export const abilityResourceByCoefficientCalculationPart = (inputData: AbilityResourceByCoefficientCalculationPart): CalculationPartProvider => {

    const coefficient = inputData.mCoefficient
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "AbilityResourceByCoefficientCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "StatCalculationPart",
                coefficient,
                formula,
                statName: "resourceMax"
            }
        ]
    };
};
