import { describe, it, expect } from 'vitest';
import {
    cleanup,
    render,
} from '@testing-library/svelte';
import { get, writable, type Writable } from 'svelte/store';
import { rainlang, rlc } from '@rainprotocol/rainlang';
import type { ExpressionConfig, RDProblem } from '@rainprotocol/rainlang';
import { getOpMetaFromSg } from '@rainprotocol/rainlang';
import ParserInput from '../ParserInput.svelte';

describe("ParserInput Tests", () => {
    let expressionConfig: Writable<ExpressionConfig>;
    let opMeta: string;
    const errors: RDProblem[] = [];

    beforeAll(async () => {
        expressionConfig = writable({
            sources: [],
            constants: []
        });
        opMeta = await getOpMetaFromSg('0x01D5611c2D6FB7Bb1bFa9df2f524196743f59F2a', 524289);
    });

    it("should render ParserInput component", async () => {
        const raw = rainlang`_: add(1000 20)`;

        const { container } = await render(ParserInput, {
            props: {
                expressionConfig,
                raw,
                errors,
                opMeta
            }
        });

        expect(container.getElementsByClassName("codemirror-wrapper").length).toBe(1);
    });

    it("should generate an expressionConfig for valid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`_: add(10 20);`
        // rendering component
        const { container } = await render(ParserInput, {
            props: {
                expressionConfig,
                raw: expression0,
                errors,
                opMeta
            }
        });

        expect(container.getElementsByClassName("codemirror-wrapper").length).toBe(1);

        // asserting expressionConfig
        const expectedExpressionConfig0 = await rlc(expression0, opMeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig0);
        cleanup();

        // 1
        const expression1 = rainlang` _ _: erc-1155-balance-of-batch(
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
                opMeta
            }
        });

        // asserting expressionConfig
        const expectedExpressionConfig1 = await rlc(expression1, opMeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig1);
        cleanup();

        // 2
        const expression2 = rainlang`  
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
                opMeta
            }
        });

        // asserting expressionConfig
        const expectedExpressionConfig2 = await rlc(expression2, opMeta);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig2);
    });
});
