import { CalculationContext } from "calculation/calculationPart/implementation/CalculationContext";
import { CalculationPartProvider } from "calculation/calculationPart/CalculationPartProvider";
import { Breakpoint, ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";

const defaultBreakpoint: Breakpoint = {
    "{57fdc438}": 0,
    __type: 'Breakpoint'
}

export const byCharLevelBreakpointsCalculationPart = (inputData: ByCharLevelBreakpointsCalculationPart): CalculationPartProvider => {

    const initValue = inputData.mLevel1Value ?? 0
    const breakpoints = inputData.mBreakpoints ?? []
    const scale = inputData['{02deb550}'] ?? 0

    const getValue = (championLevel: number) => {
        let result = initValue
        let lastBreakpoint = defaultBreakpoint

        for (let i = 2; i <= championLevel; i++) {
            result += scale

            const newBreakpoint = breakpoints.find(x => x.mLevel === i || !x.mLevel && i == 2)

            if (newBreakpoint) {
                lastBreakpoint = newBreakpoint

                result += newBreakpoint["{d5fd07ed}"] ?? 0
            }

            result += lastBreakpoint["{57fdc438}"] ?? 0
        }

        return result
    }

    return {
        type: "ByCharLevelBreakpointsCalculationPart",
        getItems: (context: CalculationContext) => [
            {
                type: "LevelCalculationPart",
                value: getValue(context.championLevel),
                min: initValue,
                max: getValue(18)
            }
        ]
    };
};
