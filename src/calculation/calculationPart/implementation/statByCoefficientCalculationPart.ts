import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { ChampionStatName } from "./domain";
import { StatByCoefficientCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

export const statByCoefficientCalculationPart = (inputData: StatByCoefficientCalculationPart): CalculationPartProvider => {

    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total
    const coefficient = inputData.mCoefficient ?? 1

    return {
        type: "StatByCoefficientCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "StatCalculationPart",
                coefficient,
                formula,
                statName
            }
        ]
    };
};
