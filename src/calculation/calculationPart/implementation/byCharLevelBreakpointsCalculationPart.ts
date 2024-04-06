import { CalculationContext } from "domain/CalculationContext";
import { CalculationPart } from "domain/CalculationPart";
import { Breakpoint, ByCharLevelBreakpointsCalculationPart } from "domain/jsonSchema/FormulaPartItem";

const defaultBreakpoint: Breakpoint = {
    "{57fdc438}": 0,
    __type: 'Breakpoint'
}

export const byCharLevelBreakpointsCalculationPart = (inputData: ByCharLevelBreakpointsCalculationPart): CalculationPart => {

    const initValue = inputData.mLevel1Value ?? 0
    const breakpoints = inputData.mBreakpoints ?? []

    const getBreakpoinValue = (breakpoint: Breakpoint) => breakpoint["{57fdc438}"] ?? breakpoint["{d5fd07ed}"]

    const scale = inputData['{02deb550}']
        ?? getBreakpoinValue(breakpoints.find(x => !x.mLevel) ?? defaultBreakpoint)

    const getValue = (context: CalculationContext) => {
        let result = initValue
        let levelStep = scale

        for (let i = 1; i < context.championLevel; i++) {
            const newBreakpoint = breakpoints.find(x => x.mLevel === i)

            if (newBreakpoint) {
                levelStep = getBreakpoinValue(newBreakpoint)
            }

            result += levelStep
        }

        return result
    }

    return {
        type: "ByCharLevelBreakpointsCalculationPart",
        getValue,
        getString: (context: CalculationContext) => getValue(context).toString()
    };
};
