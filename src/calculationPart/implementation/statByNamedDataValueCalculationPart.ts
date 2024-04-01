import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getDataValue } from "./utils/getDataValue";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";
import { ChampionStatName } from "./utils/ChampionStatName";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";

export const statByNamedDataValueCalculationPart = (inputData: StatByNamedDataValueCalculationPart): CalculationPart => {
    
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula
    const dataValue = inputData.mDataValue

    const getValue = (context: CalculationContext) => {
        const value = getDataValue(context.spellData, dataValue, context.spellLevel)

        return getPercent(value) * getStat(context, statName, formula)
    }

    return {
        getValue,
        getString: (context: CalculationContext) => `${getValue(context)}%`
    };
};
