/**
 * @title Rain Contract Metadata
 * @description Schema for a contract to be used 
 * @version 0.01
 */
export type ContractMetadata = {
    addresses: EVMAddress[]
    name: string
    description: string
    type: string
    expressions: Expression[]
    inputs: Input[]
    version: Version
}

/**
 * Version of this metadata
 */
export type Version = {
    major: number
    minor: number
}

/**
 * The address of the deployed contract for the specified chain.
 */
export type EVMAddress = {
    chainId: number
    address: string
}

/*
* Additional information about expressions (StateConfig) in this ABI.
*/
export type Expression = {
    name: string
    description: string
    path: string
}

/*
* Additional information about inputs in this ABI.
*/
export type Input = {
    name: string
    description: string
    path: string
}