import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { CooldownMultiplierCalculationPart, KsanteQCalculationPart, UdyrCalculationPart } from "domain/jsonSchema/FormulaPartItem";

type GameplayCalculationPartData = CooldownMultiplierCalculationPart | UdyrCalculationPart | KsanteQCalculationPart

// the part is used only for gameplay
export const gameplayCalculationPart = (inputData: GameplayCalculationPartData): CalculationPart => {
    return {
        type: "GameplayCalculationPart",
        getValue: (context: CalculationContext) => 1,
        getString: (context: CalculationContext) => ""
    };
}