import { describe, it, expect } from 'vitest';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/svelte';
import Select from '../Select.svelte';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import html from 'svelte-htm';

describe("Select Tests", () => {
    let user: UserEvent;

    const options = [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' }
    ];

    beforeAll(async () => {
        user = userEvent.setup();
    });

    it("should render Select component with none selected", async () => {
        const { container } = render(Select);
        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");
    });

    it("should render Select component with options", async () => {
        const { container, component } = render(Select, {
            props: {
                items: options
            }
        });
        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");
        const optionElements = select.querySelectorAll("option");
        expect(optionElements.length).toBe(options.length + 1);
        optionElements.forEach(function (option) {
            if (option.value != -1)
                expect(option.label).equals(options[option.value].label);
        });
    });

    it("should render Select an option from the list", async () => {
        const { container, component } = render(Select, {
            props: {
                items: options
            }
        });
        const select: HTMLInputElement = container.querySelector("select");
        expect(select.value).toBe("-1");

        let optionToSelect = container.querySelector('option[value="2"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("2");

        optionToSelect = container.querySelector('option[value="3"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("3");

        optionToSelect = container.querySelector('option[value="1"]');
        await fireEvent.change(select, { target: { value: optionToSelect.value } });
        expect(select.value).toBe("1");

        screen.debug(container, component);

    });

});
