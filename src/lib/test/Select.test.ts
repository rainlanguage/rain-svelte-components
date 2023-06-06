import { describe, it, expect } from 'vitest';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/svelte';
import Select from '../Select.svelte';

describe("Select Tests", () => {

    const options = [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' }
    ];


    it("should render Select component with none selected", async () => {
        const { container } = render(Select);
        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");
    });

    it("should render a disabled Select component", async () => {
        const { container, component } = render(Select, {
            props: {
                disabled: true,
            }
        });

        // Rendering multiple select components
        render(Select, {
            props: {
                disabled: false,
                value: ''
            }
        });
        const select = container.querySelector("select[disabled]")
        expect(select).toBeTruthy();
        expect(select.value).toBe("-1");
    });

    it('should display the correct number of options', () => {
        render(Select, {
            props: {
                items: options
            }
        });

        expect(screen.getAllByRole('option').length).toBe(options.length)
    })

    it("should render Select component with options", async () => {
        const { container } = render(Select, {
            props: {
                items: options
            }
        });
        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");
        const optionElements = screen.getAllByRole('option');
        expect(optionElements.length).toBe(options.length);
        optionElements.forEach(function (option) {
            expect(option.label).equals(options[option.value].label);
        });
    });

    it("should select an option from the list", async () => {
        const { container } = render(Select, {
            props: {
                items: options
            }
        });

        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");

        let optionToSelect = container.querySelector('option[value="2"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("2");
        expect(screen.getByRole('option', { name: 'Option 3' }).selected).toBe(true);

        optionToSelect = container.querySelector('option[value="3"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("3");
        expect(screen.getByRole('option', { name: 'Option 4' }).selected).toBe(true);

        optionToSelect = container.querySelector('option[value="1"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("1");
        expect(screen.getByRole('option', { name: 'Option 2' }).selected).toBe(true);

        optionToSelect = container.querySelector('option[value="0"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("0");
        expect(screen.getByRole('option', { name: 'Option 1' }).selected).toBe(true);

    });

    it("should select an option from the list and update the value prop", async () => {

        let select1 = -1;

        const { container, component } = render(Select, {
            props: {
                items: options,
            }
        });

        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");

        let optionToSelect = container.querySelector('option[value="2"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("2");
        expect(component.$$.ctx[component.$$.props["value"]]).toBe(2);
    });

});
