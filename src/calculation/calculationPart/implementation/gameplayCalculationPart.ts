import { CalculationContext } from "domain/CalculationContext";
import { CalculationPartProvider } from "domain/CalculationPartProvider";
import { CooldownMultiplierCalculationPart, KsanteQCalculationPart, UdyrCalculationPart } from "domain/jsonSchema/FormulaPartItem";

type GameplayCalculationPartData = CooldownMultiplierCalculationPart | UdyrCalculationPart | KsanteQCalculationPart

// the part is used only for gameplay
export const gameplayCalculationPart = (inputData: GameplayCalculationPartData): CalculationPartProvider => {
    return {
        type: "GameplayCalculationPart",
        getValue: (context: CalculationContext) => 1,
        getString: (context: CalculationContext) => "",
        getItems: (context: CalculationContext) => []
    };
}