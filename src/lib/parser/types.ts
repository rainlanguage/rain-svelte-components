import type { StateConfig } from "@rainprotocol/rainlang"

export type EvaluableConfig = {
    interpreter: string,
    deployer: string,
    store: string,
    expressionConfig: StateConfig
}

export type EvaluableAddresses = {
    interpreter: string,
    deployer: string,
    store: string
}