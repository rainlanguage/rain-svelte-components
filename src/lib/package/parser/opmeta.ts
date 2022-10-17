import { AllStandardOps, OpAdd, OpAny, OpBlockNumber, OpCaller, OpDiv, OpEagerIf, OpEqualTo, OpERC1155BalanceOf, OpERC1155BalanceOfBatch, OpERC20BalanceOf, OpERC20SnapshotBalanceOfAt, OpERC20SnapshotTotalSupplyAt, OpERC20TotalSupply, OpERC721BalanceOf, OpERC721OwnerOf, OpEvery, OpExp, OpGreaterThan, OpIsZero, OpITierV2Report, OpITierV2ReportTimesForTier, OpLessThan, OpMax, OpMin, OpMod, OpMul, OpSaturatingAdd, OpSaturatingDiff, OpSaturatingMul, OpSaturatingSub, OpScale18, OpScale18Div, OpScale18Mul, OpScaleBy, OpScaleN, OpSelectLte, OpSub, OpThisAddress, OpTimestamp, OpUpdateTimesForTierRange, pnp, RainJSVM, type IOpMeta, type StateJSVM } from "rain-sdk";

export const OpMeta: Map<number, IOpMeta> = new Map([
    [
        0,
        {
            enum: AllStandardOps.CONSTANT,
            name: 'constant',
            description: 'Insert a constant into the expression.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: false,
            jsvmfn: function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): void {
                this.constant(operand, data)
            },
            data: {
                category: "core",
                example: "constant(100)",
                parameters: [
                    {
                        spread: false,
                        name: "index",
                        description: "The constant value to insert."
                    }
                ]
            }
        }
    ],
    [
        1,
        {
            enum: AllStandardOps.STACK,
            name: 'stack',
            description: 'Insert a value from elsewhere in the stack.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: false,
            jsvmfn: function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): void {
                this.stack(operand, data)
            },
            data: {
                category: "core",
                example: "stack(1)",
                parameters: [
                    {
                        spread: false,
                        name: "index",
                        description: "The stack position of the value to insert."
                    }
                ]
            }
        }
    ],
    [
        2,
        {
            enum: AllStandardOps.CONTEXT,
            name: 'context',
            description: "Insert a value from the calling function's context",
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: false,
            jsvmfn: function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): void {
                this.context(operand, data)
            },
            data: {
                category: "core",
                example: "context(0)",
                parameters: [
                    {
                        spread: false,
                        name: "index",
                        description: "The index of the context value to insert."
                    }
                ]
            }
        }
    ],
    [
        3,
        {
            enum: AllStandardOps.STORAGE,
            name: 'storage',
            description: 'Insert a value from contract storage.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: false,
            jsvmfn: async function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): Promise<void> {
                await this.storage(operand, data)
            },
            data: {
                category: "core",
                example: "storage(0)",
                parameters: [
                    {
                        spread: false,
                        name: "index",
                        description: "The index of the storage value to insert."
                    }
                ]
            }
        }
    ],
    [
        4,
        {
            enum: AllStandardOps.ZIPMAP,
            name: 'zipmap',
            description: "Takes N values off the stack, interprets them as an array then zips and maps a source from `sources` over them. The source has access to the original constants using `1 0` and to zipped arguments as `1 1`.",
            pushes: pnp.zpush,
            pops: pnp.derived,
            isZeroOperand: false,
            jsvmfn: async function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): Promise<void> {
                await this.zipmap(operand, data)
            },
            data: {
                category: "core",
                example: "zipmap(0, 0)",
                parameters: [
                    {
                        spread: false,
                        name: "noOfValues",
                        description: "The number of values to take off the stack."
                    },
                    {
                        spread: false,
                        name: "index",
                        description: "The index of the sources array to zip values with."
                    }
                ]
            }
        }
    ],
    [
        5,
        {
            enum: AllStandardOps.DEBUG,
            name: 'debug',
            description: 'ABI encodes the entire stack and logs it to the hardhat console.',
            pushes: pnp.zero,
            pops: pnp.zero,
            isZeroOperand: false,
            jsvmfn: function (
                this: RainJSVM,
                state: StateJSVM,
                operand: number,
                data?: any
            ): void {
                this.debug(operand, data)
            },
            data: {
                category: "core",
                example: "debug()",
                parameters: []
            }
        }
    ],
    [
        6,
        {
            enum: AllStandardOps.IERC20_BALANCE_OF,
            name: 'ierc20_balance_of',
            description: 'Get the balance of an ERC20 token for an account.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpERC20BalanceOf,
            data: {
                category: "ERC20",
                example: "ierc20_balance_of(0x..., 0x...)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC20 address."
                    },
                    {
                        spread: false,
                        name: "account",
                        description: "The account to get the balance of."
                    }
                ]
            }
        }
    ],
    [
        7,
        {
            enum: AllStandardOps.IERC20_TOTAL_SUPPLY,
            name: 'ierc20_total_supply',
            description: 'Get the totalSupply of an ERC20 token.',
            pushes: pnp.one,
            pops: pnp.one,
            isZeroOperand: true,
            jsvmfn: OpERC20TotalSupply,
            data: {
                category: "ERC20",
                example: "ierc20_total_supply(0x...)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC20 address."
                    }
                ]
            }
        }
    ],
    [
        8,
        {
            enum: AllStandardOps.IERC20_SNAPSHOT_BALANCE_OF_AT,
            name: 'ierc20_snapshot_balance_of_at',
            description: 'Retrieves the balance of an account at the time a snapshotId was created.',
            pushes: pnp.one,
            pops: pnp.three,
            isZeroOperand: true,
            jsvmfn: OpERC20SnapshotBalanceOfAt,
            data: {
                category: "ERC20",
                example: "ierc20_snapshot_balance_of_at(0x..., 0x..., 1)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC20 address."
                    },
                    {
                        spread: false,
                        name: "account",
                        description: "The account to get the balance of."
                    },
                    {
                        spread: false,
                        name: "snapshotId",
                        description: "The id of the snapshot."
                    }
                ]
            }
        }
    ],
    [
        9,
        {
            enum: AllStandardOps.IERC20_SNAPSHOT_TOTAL_SUPPLY_AT,
            name: 'ierc20_snapshot_total_supply_at',
            description: 'Retrieves the total supply of a token at the time a snapshotId was created.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpERC20SnapshotTotalSupplyAt,
            data: {
                category: "ERC20",
                example: "ierc20_snapshot_total_supply_at(0x..., 1)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC20 address."
                    },
                    {
                        spread: false,
                        name: "snapshotId",
                        description: "The id of the snapshot."
                    }
                ]
            }
        }
    ],
    [
        10,
        {
            enum: AllStandardOps.IERC721_BALANCE_OF,
            name: 'ierc721_balance_of',
            description: 'Get the balance of an ERC721 token for an account.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpERC721BalanceOf,
            data: {
                category: "ERC721",
                example: "ierc721_balance_of(0x..., 0x...)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC721 address."
                    },
                    {
                        spread: false,
                        name: "account",
                        description: "The account to get the balance of."
                    }
                ]
            }
        },

    ],
    [
        11,
        {
            enum: AllStandardOps.IERC721_OWNER_OF,
            name: 'ierc721_owner_of',
            description: 'Returns the owner of the tokenId token.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpERC721OwnerOf,
            data: {
                category: "ERC721",
                example: "ierc721_owner_of(0x..., 1)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC721 address."
                    },
                    {
                        spread: false,
                        name: "id",
                        description: "The id to get the owner of."
                    }
                ]
            }
        }
    ],
    [
        12,
        {
            enum: AllStandardOps.IERC1155_BALANCE_OF,
            name: 'ierc1155_balance_of',
            description: '',
            pushes: pnp.one,
            pops: pnp.three,
            isZeroOperand: true,
            jsvmfn: OpERC1155BalanceOf,
            data: {
                category: "ERC1155",
                example: "ierc1155_balance_of(0x..., 0x..., 1)",
                parameters: [
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC1155 address."
                    },
                    {
                        spread: false,
                        name: "id",
                        description: "The id to get the balance of."
                    },
                    {
                        spread: false,
                        name: "account",
                        description: "The account to get the balance of."
                    }
                ]
            }
        }
    ],
    [
        13,
        {
            enum: AllStandardOps.IERC1155_BALANCE_OF_BATCH,
            name: 'ierc1155_balance_of_batch',
            description: 'Batched version of balanceOf.',
            pushes: pnp.oprnd,
            pops: pnp.derived,
            isZeroOperand: false,
            jsvmfn: OpERC1155BalanceOfBatch,
            data: {
                category: "ERC1155",
                example: "ierc1155_balance_of_batch(2, 0x..., 0x..., 0x..., 1, 2)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of accounts/ids to get the balance of."
                    },
                    {
                        spread: false,
                        name: "token",
                        description: "The ERC1155 address."
                    },
                    {
                        spread: true,
                        name: "account",
                        description: "The accounts to get the balance of."
                    },
                    {
                        spread: true,
                        name: "id",
                        description: "The corresponding ids to get the balance of."
                    }
                ]
            }
        }
    ],
    [
        14,
        {
            enum: AllStandardOps.BLOCK_NUMBER,
            name: 'block_number',
            description: 'Inserts the current block number.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: true,
            jsvmfn: OpBlockNumber,
            aliases: ['current_block'],
            data: {
                category: "EVM",
                example: "block_number()",
                parameters: []
            }
        }
    ],
    [
        15,
        {
            enum: AllStandardOps.SENDER,
            name: 'sender',
            description: 'The sender of the current transaction.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: true,
            jsvmfn: OpCaller,
            aliases: ['msg_sender'],
            data: {
                category: "EVM",
                example: "sender()",
                parameters: []
            }
        }
    ],
    [
        16,
        {
            enum: AllStandardOps.THIS_ADDRESS,
            name: 'this_address',
            description: 'The address of the contract this expression is being evaluated in.',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: true,
            jsvmfn: OpThisAddress,
            aliases: ['THIS_ADDRESS'],
            data: {
                category: "EVM",
                example: "this_address()",
                parameters: []
            }
        }
    ],
    [
        17,
        {
            enum: AllStandardOps.BLOCK_TIMESTAMP,
            name: 'block_timestamp',
            description: 'The timestamp of the current block (in seconds).',
            pushes: pnp.one,
            pops: pnp.zero,
            isZeroOperand: true,
            jsvmfn: OpTimestamp,
            aliases: ['current_timestamp'],
            data: {
                category: "EVM",
                example: "this_address()",
                parameters: []
            }
        }
    ],
    [
        18,
        {
            enum: AllStandardOps.SCALE18,
            name: 'scale18',
            description: 'Rescale some fixed point number to 18 OOMs in situ.',
            pushes: pnp.one,
            pops: pnp.one,
            isZeroOperand: false,
            jsvmfn: OpScale18,
            data: {
                category: "math",
                example: "scale18(10)",
                parameters: []
            }
        }
    ],
    [
        19,
        {
            enum: AllStandardOps.SCALE18_DIV,
            name: 'scale18_div',
            description: '',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: false,
            jsvmfn: OpScale18Div,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        20,
        {
            enum: AllStandardOps.SCALE18_MUL,
            name: 'scale18_mul',
            description: '',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: false,
            jsvmfn: OpScale18Mul,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        21,
        {
            enum: AllStandardOps.SCALE_BY,
            name: 'scale_by',
            description: 'Rescale an arbitrary fixed point number by some OOMs.',
            pushes: pnp.one,
            pops: pnp.one,
            isZeroOperand: false,
            jsvmfn: OpScaleBy,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        22,
        {
            enum: AllStandardOps.SCALEN,
            name: 'scalen',
            description: 'Rescale an 18 OOMs fixed point number to scale N.',
            pushes: pnp.one,
            pops: pnp.one,
            isZeroOperand: false,
            jsvmfn: OpScaleN,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        23,
        {
            enum: AllStandardOps.ANY,
            name: 'any',
            description: 'Returns true if any of N number of sub-expressions are non-zero',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpAny,
            data: {
                category: "logic",
                example: "any(2, {expression}, {expression})",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to check (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to check."
                    }
                ]
            }
        }
    ],
    [
        24,
        {
            enum: AllStandardOps.EAGER_IF,
            name: 'eager_if',
            description: 'If statement',
            pushes: pnp.one,
            pops: pnp.three,
            isZeroOperand: true,
            jsvmfn: OpEagerIf,
            data: {
                category: "logic",
                example: "eager_if(1, 100, 200)",
                parameters: [
                    {
                        spread: false,
                        name: "condition",
                        description: "The condition to evaluate."
                    },
                    {
                        spread: false,
                        name: "then",
                        description: "The value if the condition is non-zero/true."
                    },
                    {
                        spread: false,
                        name: "else",
                        description: "The value if the condition is zero/false."
                    }
                ]
            }
        }
    ],
    [
        25,
        {
            enum: AllStandardOps.EQUAL_TO,
            name: 'equal_to',
            description: 'Returns true if two values are equal.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpEqualTo,
            data: {
                category: "logic",
                example: "equal_to(100, 200)",
                parameters: [
                    {
                        spread: false,
                        name: "value1",
                        description: "The first value."
                    },
                    {
                        spread: false,
                        name: "value2",
                        description: "The second value."
                    }
                ]
            }
        }
    ],
    [
        26,
        {
            enum: AllStandardOps.EVERY,
            name: 'every',
            description: 'Returns true if all of N number of sub-expressions are non-zero',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpEvery,
            data: {
                category: "logic",
                example: "every(2, {expression}, {expression})",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to check (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to check."
                    }
                ]
            }
        }
    ],
    [
        27,
        {
            enum: AllStandardOps.GREATER_THAN,
            name: 'greater_than',
            description: 'Returns true if value X is greater than value Y.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpGreaterThan,
            data: {
                category: "logic",
                example: "greater_than(X, Y)",
                parameters: [
                    {
                        spread: false,
                        name: "value",
                        description: "The first value."
                    },
                    {
                        spread: false,
                        name: "value",
                        description: "The second value."
                    }
                ]
            }
        }
    ],
    [
        28,
        {
            enum: AllStandardOps.ISZERO,
            name: 'iszero',
            description: 'Returns true if a value is zero.',
            pushes: pnp.one,
            pops: pnp.one,
            isZeroOperand: true,
            jsvmfn: OpIsZero,
            data: {
                category: "logic",
                example: "iszero(1)",
                parameters: [
                    {
                        spread: false,
                        name: "value",
                        description: "The value to check."
                    }
                ]
            }
        }
    ],
    [
        29,
        {
            enum: AllStandardOps.LESS_THAN,
            name: 'less_than',
            description: 'Returns true if value X is less than value Y.',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpLessThan,
            data: {
                category: "logic",
                example: "less_than(X, Y)",
                parameters: [
                    {
                        spread: false,
                        name: "value",
                        description: "The first value."
                    },
                    {
                        spread: false,
                        name: "value",
                        description: "The second value."
                    }
                ]
            }
        }
    ],
    [
        30,
        {
            enum: AllStandardOps.SATURATING_ADD,
            name: 'saturating_add',
            description: '',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpSaturatingAdd,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        31,
        {
            enum: AllStandardOps.SATURATING_MUL,
            name: 'saturating_mul',
            description: '',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpSaturatingMul,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        32,
        {
            enum: AllStandardOps.SATURATING_SUB,
            name: 'saturating_sub',
            description: '',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpSaturatingSub,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        33,
        {
            enum: AllStandardOps.ADD,
            name: 'add',
            description: 'Sums N number of values.',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpAdd,
            data: {
                category: "math",
                example: "add(3, 1, 3, 2)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to sum (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to sum."
                    }
                ]
            }
        }
    ],
    [
        34,
        {
            enum: AllStandardOps.DIV,
            name: 'div',
            description: 'Divides N number of values.',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpDiv,
            data: {
                category: "math",
                example: "div(3, 1, 3, 2)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to divide (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to divide."
                    }
                ]
            }
        }
    ],
    [
        35,
        {
            enum: AllStandardOps.EXP,
            name: 'exp',
            description: '',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpExp,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        36,
        {
            enum: AllStandardOps.MAX,
            name: 'max',
            description: 'Returns the maximum of N number of values',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpMax,
            data: {
                category: "math",
                example: "max(1, 2, 3)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to get the max of."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to get the max of."
                    }
                ]
            }
        }
    ],
    [
        37,
        {
            enum: AllStandardOps.MIN,
            name: 'min',
            description: 'Returns the minimum of N number of values',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpMin,
            data: {
                category: "math",
                example: "min(1, 2, 3)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to get the min of."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to get the min of."
                    }
                ]
            }
        }
    ],
    [
        38,
        {
            enum: AllStandardOps.MOD,
            name: 'mod',
            description: '',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpMod,
            data: {
                category: "math",
                example: "",
                parameters: []
            }
        }
    ],
    [
        39,
        {
            enum: AllStandardOps.MUL,
            name: 'mul',
            description: 'Multiplies N number of values',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpMul,
            data: {
                category: "math",
                example: "mul(3, 1, 2, 3)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to multiply (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to multiply."
                    }
                ]
            }
        }
    ],
    [
        40,
        {
            enum: AllStandardOps.SUB,
            name: 'sub',
            description: 'Subtracts N number of values',
            pushes: pnp.one,
            pops: pnp.oprnd,
            isZeroOperand: false,
            jsvmfn: OpSub,
            data: {
                category: "math",
                example: "sub(3, 1, 2, 3)",
                parameters: [
                    {
                        spread: false,
                        name: "operand",
                        description: "The number of values to subtract (N)."
                    },
                    {
                        spread: true,
                        name: "values",
                        description: "The values to subtract."
                    }
                ]
            }
        }
    ],
    [
        41,
        {
            enum: AllStandardOps.ITIERV2_REPORT,
            name: 'ITIERV2_REPORT',
            description: '',
            pushes: pnp.one,
            pops: pnp.derived,
            isZeroOperand: false,
            jsvmfn: OpITierV2Report,
            data: {
                category: "tier",
                example: "",
                parameters: []
            }
        }
    ],
    [
        42,
        {
            enum: AllStandardOps.ITIERV2_REPORT_TIME_FOR_TIER,
            name: 'ITIERV2_REPORT_TIME_FOR_TIER',
            description: '',
            pushes: pnp.one,
            pops: pnp.derived,
            isZeroOperand: false,
            jsvmfn: OpITierV2ReportTimesForTier,
            data: {
                category: "tier",
                example: "",
                parameters: []
            }
        }
    ],
    [
        43,
        {
            enum: AllStandardOps.SATURATING_DIFF,
            name: 'SATURATING_DIFF',
            description: '',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: true,
            jsvmfn: OpSaturatingDiff,
            data: {
                category: "tier",
                example: "",
                parameters: []
            }
        }
    ],
    [
        44,
        {
            enum: AllStandardOps.SELECT_LTE,
            name: 'SELECT_LTE',
            description: '',
            pushes: pnp.one,
            pops: pnp.derived,
            isZeroOperand: false,
            jsvmfn: OpSelectLte,
            data: {
                category: "tier",
                example: "",
                parameters: []
            }
        }
    ],
    [
        45,
        {
            enum: AllStandardOps.UPDATE_TIMES_FOR_TIER_RANGE,
            name: 'UPDATE_TIMES_FOR_TIER_RANGE',
            description: '',
            pushes: pnp.one,
            pops: pnp.two,
            isZeroOperand: false,
            jsvmfn: OpUpdateTimesForTierRange,
            data: {
                category: "tier",
                example: "",
                parameters: []
            }
        }
    ]
]);
