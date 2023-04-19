import { describe, it } from 'vitest';
import {
    render,
    screen
  } from '@testing-library/svelte';
import { Parser } from '$lib';

describe("Parser Tests", () => {
    it("should render the parser component", () => {
        render(Parser);
        const parser = screen.getByText("No deployers found!");
        console.log(parser);
        expect(true).toBe(true)
    })
})
