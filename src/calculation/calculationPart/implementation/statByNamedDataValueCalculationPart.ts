import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue } from "./utils";
import { ChampionStatName } from "./domain";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";

export const statByNamedDataValueCalculationPart = (inputData: StatByNamedDataValueCalculationPart, spellData: Spell): CalculationPartProvider => {
    
    const dataValues = getDataValue(spellData, inputData.mDataValue)
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "StatByNamedDataValueCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "StatCalculationPart",
                coefficient: dataValues[context.spellLevel],
                formula,
                statName
            }
        ]
    };
};
