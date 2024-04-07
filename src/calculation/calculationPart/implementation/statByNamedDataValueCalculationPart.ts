import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { StatByNamedDataValueCalculationPart } from "domain/jsonSchema/FormulaPartItem";
import { ChampionStat } from "domain/jsonSchema/ChampionStat";
import { Spell } from "domain/jsonSchema/SpellData";
import { getDataValue, getStat } from "./utils";
import { ChampionStatName } from "./utils/ChampionStatName";
import { ChampionStatFormula } from "domain/jsonSchema/ChampionStatFormula";
import { ChampionStatFormulaName } from "./utils/ChampionStatFormulaName";

export const statByNamedDataValueCalculationPart = (inputData: StatByNamedDataValueCalculationPart, spellData: Spell): CalculationPart => {
    
    const dataValues = getDataValue(spellData, inputData.mDataValue)
    const statName = ChampionStatName[inputData.mStat ?? ChampionStat.AbilityPower]
    const formula = inputData.mStatFormula ?? ChampionStatFormula.Total

    return {
        type: "StatByNamedDataValueCalculationPart",
        getValue: (context: CalculationContext) => dataValues[context.spellLevel] * getStat(context, statName, formula),
        getString: (context: CalculationContext) => `${(dataValues[context.spellLevel] * 100).toFixed()}% @${ChampionStatFormulaName[formula]}@ @${statName}@`
    };
};
