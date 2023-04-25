import { describe, it, expect } from 'vitest';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/svelte';
import Input from '../Input.svelte';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import html from 'svelte-htm';

describe("Parser Tests", () => {
    let user: UserEvent;

    beforeAll(async () => {
        user = userEvent.setup();
    });

    it("should render Input component of default type", async () => {
        const { container } = render(Input);
        const input: HTMLInputElement = container.querySelector("input[type=text]")
        expect(input.value).toBe('');
    });

    it("should render Input component of type number", async () => {
        const { container } = render(Input, {
            props: {
                type: 'number'
            }
        });
        const input: HTMLInputElement = container.querySelector("input[type=number]");
        expect(input).toBeTruthy();
        expect(input.value).toBe('');
    });

    it("should render Input component of type datetime-local", async () => {
        const { container } = render(Input, {
            props: {
                type: 'datetime-local'
            }
        });
        const input: HTMLInputElement = container.querySelector("input[type=datetime-local]");
        expect(input).toBeTruthy();
        expect(input.value).toBe('');
    });

    it("should render Input component of type textarea", async () => {
        const { container } = render(Input, {
            props: {
                type: 'textarea'
            }
        });
        const input: HTMLInputElement = container.querySelector("textarea")
        expect(input.value).toBe('');
    });

    it("should render Input component of type range", async () => {
        const min = '10', max = '20';
        const { container } = render(Input, {
            props: {
                type: 'range',
                min: min,
                max: max
            }
        });
        expect(container.querySelector("input[type=range]")).toBeTruthy();
        expect(container.querySelector(`input[min='${min}']`)).toBeTruthy();
        expect(container.querySelector(`input[max='${max}']`)).toBeTruthy();
    });

    it("should render a label passed from a slot", async () => {
        const { container } = render(html`
        <${Input}> 
            <span slot="label">Input name</span> 
        </${Input}>`);
        expect(container.querySelector("input[type=text]")).toBeTruthy();
        expect(screen.getByText("Input name")).toBeTruthy();
    });

    it("should render a description passed from a slot", async () => {
        const { container } = render(html`
        <${Input}> 
            <span slot="label">Input name</span> 
            <span slot="description">Input description</span> 
        </${Input}>`);
        expect(container.querySelector("input[type=text]")).toBeTruthy();
        expect(screen.getByText("Input name")).toBeTruthy();
        expect(screen.getByText("Input description")).toBeTruthy();
    });

    it("should render a placeholder for the input element", async () => {
        const placeholder = "Input Placeholder";
        const { container } = render(html`
        <${Input} placeholder=${placeholder}> 
            <span slot="label">Input name</span> 
            <span slot="description">Input description</span> 
        </${Input}>`);
        expect(container.querySelector("input[type=text]")).toBeTruthy();
        expect(screen.getByText("Input name")).toBeTruthy();
        expect(screen.getByText("Input description")).toBeTruthy();
        expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it("should validate the input value and display error", async () => {
        const inputValue = "Error Value";
        const validator = async (value: any): Promise<true | { error: string }> => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve('');
                }, 1000);
            });
            if (value === inputValue) {
                return { error: 'Sample error message' };
            }
            return true;
        };

        const { container, component } = render(Input, {
            props: {
                type: 'text',
                validator: validator
            }
        });

        // Mock Handle Blur for dispatch
        const mock = vi.fn();
        component.$on('blur', mock);

        const input: HTMLInputElement = container.querySelector("input[type=text]")
        expect(input).toBeTruthy();
        await fireEvent.input(input, { target: { value: inputValue } });

        expect(input.value).toBe(inputValue);

        // Triggering the handleBlur event
        await fireEvent.blur(input);

        // Asserting Ring
        expect(container.querySelector(".lring")).toBeTruthy();
        await screen.findByText("Sample error message");

        // Asserting dispatch
        expect(mock).toHaveBeenCalled();
        // Asserting component prop
        expect(component.$$.ctx[component.$$.props.value]).toEqual(inputValue);
    });

    it("should dispatch the input event when doDebounce is not defined", async () => {
        const inputValue = "Input event triggered"
        const { container, component } = render(Input, {
            props: {
                type: 'text',
            }
        });

        // Mock Handle Blur for dispatch
        let inputData = '';
        const mock = vi.fn((event) => (inputData = event.detail));
        component.$on('input', mock);

        const input: HTMLInputElement = container.querySelector("input[type=text]")
        expect(input).toBeTruthy();

        // Trigger the input event
        await fireEvent.input(input, { target: { value: inputValue } });

        // Asserting dispatch
        expect(mock).toHaveBeenCalled();
        expect(input.value).toBe(inputValue);
        expect(inputData).toEqual(inputValue);

        // Asserting component prop
        expect(component.$$.ctx[component.$$.props.value]).toEqual(inputValue);
    });

    it("should dispatch the input event when doDebounce is defined", async () => {
        vi.useFakeTimers();

        const debounceTime = 2000;
        const inputValue = "Input event triggered";

        const { container, component } = render(Input, {
            props: {
                type: 'text',
                debounce: true,
                debounceTime: debounceTime
            }
        });

        // Mock Handle Blur for dispatch
        let inputData = '';
        const mock = vi.fn((event) => (inputData = event.detail));
        component.$on('input', mock);

        const input: HTMLInputElement = container.querySelector("input[type=text]")
        expect(input).toBeTruthy();

        // Trigger the input event
        await fireEvent.input(input, { target: { value: inputValue } });

        // Advance the time
        vi.advanceTimersByTime(debounceTime);

        expect(mock).toHaveBeenCalled()
        expect(input.value).toBe(inputValue);
        expect(inputData).toEqual(inputValue);
        // Asserting component prop
        expect(component.$$.ctx[component.$$.props.value]).toEqual(inputValue);

        vi.useRealTimers()
    });
});
