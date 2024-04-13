import { describe, expect, it } from "@jest/globals"
import { getPercent } from "../getPercent"

describe("getPercent", () => {
    describe.each([
        [ 0.001, "0.1%" ],
        [ 3, "300%" ],
        [ 10, "10" ],
        [ 11, "11" ],
    ])("Should return x100 value if it is less than the provided threshold", (input, expectedOutput) => {
        it(`Should return ${expectedOutput} when provided with ${input} (threshold = 10)`, () => {
            const result = getPercent(input, 10)

            expect(result).toEqual(expectedOutput)
        })
    })

    describe.each([
        [ 0.001, "0.1%" ],
        [ 0.1, "0.1" ],
        [ 3, "3" ]
    ])("Should use the default threshould equal to 0.01", (input, expectedOutput) => {
        it(`Should return ${expectedOutput} when provided with ${input}`, () => {
            const result = getPercent(input)

            expect(result).toEqual(expectedOutput)
        })
    })
})
