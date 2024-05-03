import { CalculationProvider } from "calculation/gameCalculation/GameCalculationProvider"

export type CalculationProviderContainer<T extends CalculationProvider> = {
    name: string
    calculation: T
}
