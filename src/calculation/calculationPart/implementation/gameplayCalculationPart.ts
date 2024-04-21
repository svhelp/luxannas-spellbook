import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { CooldownMultiplierCalculationPart, KsanteQCalculationPart, UdyrCalculationPart } from "domain/jsonSchema/FormulaPartItem";

type GameplayCalculationPartData = CooldownMultiplierCalculationPart | UdyrCalculationPart | KsanteQCalculationPart

// the part is used only for gameplay
export const gameplayCalculationPart = (inputData: GameplayCalculationPartData): CalculationPartProvider => {
    return {
        type: "GameplayCalculationPart",
        getItems: (context: CalculationContext) => []
    };
}