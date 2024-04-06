const defaultThreshold = 0.01

export const getPercent = (value: number, threshold?: number) =>
    (value > 0 && value < (threshold ?? defaultThreshold)) ? `${value * 100}%` : value.toString()
