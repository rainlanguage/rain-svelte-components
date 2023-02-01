import type { StateConfig } from "@rainprotocol/rainlang"

export type EvaluableConfig = {
    interpreter: string,
    deployer: string,
    store: string,
    expressionConfig: StateConfig
}

export const constructEvaluableConfig: () => EvaluableConfig = () => {
    return {
        interpreter: '',
        deployer: '',
        store: '',
        expressionConfig: {
            sources: [],
            constants: []
        }
    }
}

export type EvaluableAddresses = {
    interpreter: string,
    deployer: string,
    store: string
}