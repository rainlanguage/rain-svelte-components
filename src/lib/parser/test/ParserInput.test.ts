import { describe, it, expect } from 'vitest';
import {
    cleanup,
    render,
} from '@testing-library/svelte';
import { get, writable, type Writable } from 'svelte/store';
import { rainlang, rlc } from '@rainprotocol/rainlang';
import type { ExpressionConfig, RDProblem } from '@rainprotocol/rainlang';
import ParserInput from '../ParserInput.svelte';

describe("ParserInput Tests", () => {
    let expressionConfig: Writable<ExpressionConfig>;
    const errors: RDProblem[] = [];

    beforeAll(async () => {
        expressionConfig = writable({
            sources: [],
            constants: []
        });
    });

    it("should render ParserInput component", async () => {
        const raw = rainlang`_: add(1000 20)`;

        const { container } = await render(ParserInput, {
            props: {
                expressionConfig,
                raw,
                errors,
            }
        });

        expect(container.getElementsByClassName("codemirror-wrapper").length).toBe(1);
    });

    it("should generate an expressionConfig for valid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`
        @0x47ed85f917e187757bff09371cedcf5c0eb277c27e4673feb2d3cc040c66c993
        _: add(10 20);`
        // rendering component
        const { container } = await render(ParserInput, {
            props: {
                expressionConfig,
                raw: expression0,
                errors,
            }
        });

        expect(container.getElementsByClassName("codemirror-wrapper").length).toBe(1);

        // asserting expressionConfig
        const expectedExpressionConfig0 = await rlc(expression0);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig0);
        cleanup();

        // 1
        const expression1 = rainlang` @0x47ed85f917e187757bff09371cedcf5c0eb277c27e4673feb2d3cc040c66c993
        _ _: erc-1155-balance-of-batch(
            0x01
            0x02
            0x03
            0x02
            0x03
        );`
        // rendering component
        await render(ParserInput, {
            props: {
                expressionConfig,
                raw: expression1,
                errors,
            }
        });

        // asserting expressionConfig
        const expectedExpressionConfig1 = await rlc(expression1);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig1);
        cleanup();

        // 2
        const expression2 = rainlang` 
        @0x47ed85f917e187757bff09371cedcf5c0eb277c27e4673feb2d3cc040c66c993 
            c0: 1,
            c1: 2,
            condition: 1, 
            _ _: do-while<1>(c0 c1 condition);
            
            s0 s1: ,
            o0 o1: 1 2,
            condition: 3; 

            s0: ,
            _: less-than(s0 3);

            s0 s1: ,
            _: add(s0 4),
            _: add(s1 5);`;

        // rendering component
        await render(ParserInput, {
            props: {
                expressionConfig,
                raw: expression2,
                errors,
            }
        });

        // asserting expressionConfig
        const expectedExpressionConfig2 = await rlc(expression2);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig2);
    });
});
