import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { getStat } from "./utils/getStat";
import { getPercent } from "./utils/getPercent";
import { ChampionStatName } from "./utils/ChampionStatName";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { Spell } from "domain/jsonSchema/SpellData";

export const statByNamedDataValueCalculationPart = (inputData: StatByNamedDataValueCalculationPart, spellData: Spell): CalculationPart => {
    
    const dataValues = spellData.mDataValues.find(x => x.mName === inputData.mDataValue).mValues
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula

    const getValue = (context: CalculationContext) => {
        const value = dataValues[context.spellLevel]

        return getPercent(value) * getStat(context, statName, formula)
    }

    return {
        type: "StatByNamedDataValueCalculationPart",
        getValue,
        getString: (context: CalculationContext) => `${getValue(context)}%`
    };
};
