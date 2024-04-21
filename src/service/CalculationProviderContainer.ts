import { CalculationProvider } from "calculation/GameCalculationProvider"

export type CalculationProviderContainer<T extends CalculationProvider> = {
    name: string
    calculation: T
}
