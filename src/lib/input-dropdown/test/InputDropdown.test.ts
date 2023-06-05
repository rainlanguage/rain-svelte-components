import { describe, it, expect } from 'vitest';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/svelte';

import InputDropdown, { type Item } from '../InputDropdown.svelte';

describe("Select Tests", () => {

    const items = [
        {
            label: 'Driving',
            value: 'Engine'
        },
        {
            label: 'Walking',
            value: 'Feet'
        },
        {
            label: 'Fast walking',
            value: 'Feet'
        },
        {
            label: 'Flying',
            value: 'Turbine'
        }
    ];

    it("should render the InputDropdown component with empty elements", async () => {
        const { container, component } = render(InputDropdown);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement.value).toBe("");
    });

    it("should render the InputDropdown component with items", async () => {
        const { container } = render(InputDropdown, {
            props: {
                items: items
            }
        });

        const inputElement = screen.getByRole('textbox');

        // Focusing the input element
        await fireEvent.focus(inputElement);
        expect(inputElement.value).toBe("");

        // Get all child elements
        const childElements = container.querySelector('.default-container')?.children;
        expect(childElements.length).toBe(items.length);

        // Asserting each element
        items.forEach(item => {
            expect(screen.getByText(item.label)).to.exist;
        });
    });

    it('should select an option on click', async () => {
        const { container, component } = render(InputDropdown, {
            props: {
                items: items
            }
        });

        const inputElement = screen.getByRole('textbox');

        // Focusing the input element
        await fireEvent.focus(inputElement);
        expect(inputElement.value).toBe("");

        // Get all child elements
        const dropdownOptions = container.querySelectorAll('.default-item');
        expect(dropdownOptions.length).toBe(items.length);

        // Click on a dropdown element
        await fireEvent.click(dropdownOptions[dropdownOptions.length - 1]);
        expect(inputElement.value).toBe(dropdownOptions[dropdownOptions.length - 1].textContent?.trimEnd());

        expect(component.$$.ctx[component.$$.props["value"]]).toBe(items[items.length - 1].value);
    })

    it("should filter items based on input text", async () => {
        const { container } = render(InputDropdown, {
            props: {
                items: items
            }
        });

        const inputElement = screen.getByRole('textbox');

        // Focusing the input element
        await fireEvent.focus(inputElement);
        expect(inputElement.value).toBe("");

        // Search using partial string
        await fireEvent.input(inputElement, { target: { value: items[0].label.substring(0, 3) } });
        expect(inputElement.value).toBe(items[0].label.substring(0, 3));

        // Get all child elements and assert length
        const childElements = container.querySelector('.default-container')?.children;
        expect(childElements.length).toBe(1);
        expect(screen.getByText(items[0].label)).to.exist;

    });

    it("should show default value when no match is found", async () => {
        render(InputDropdown, {
            props: {
                items: items
            }
        });

        const inputElement = screen.getByRole('textbox');

        // Focusing the input element
        await fireEvent.focus(inputElement);
        expect(inputElement.value).toBe("");

        // Search using partial string
        await fireEvent.input(inputElement, { target: { value: items[0].label.substring(0, 3) + "Random Value" } });
        expect(inputElement.value).toBe(items[0].label.substring(0, 3) + "Random Value");

        expect(screen.getByText("No match found")).to.exist;
    });

    it("should filter items based on a custom filter function", async () => {
        // Filter function with NOT filter
        const filterFunction = (searchLabel: string, itemList: Item[]): Item[] => {
            searchLabel = searchLabel.toLowerCase();
            const val: Item[] = [];

            itemList.forEach((item_) => {
                const itemLabel = item_.label.toLowerCase();
                if (!itemLabel.includes(searchLabel)) {
                    val.push(item_);
                }
            });

            return val;
        };

        const { container } = render(InputDropdown, {
            props: {
                items: items,
                filterFN: filterFunction
            }
        });

        const inputElement = screen.getByRole('textbox');

        // Focusing the input element
        await fireEvent.focus(inputElement);
        expect(inputElement.value).toBe("");

        // Search using partial string
        await fireEvent.input(inputElement, { target: { value: items[0].label.substring(0, 3) } });
        expect(inputElement.value).toBe(items[0].label.substring(0, 3));

        // Get all child elements and assert length
        const childElements = container.querySelector('.default-container')?.children;
        expect(childElements.length).toBe(items.length - 1);

        items.slice(1).forEach(item => {
            expect(screen.getByText(item.label)).to.exist;
        });

    });

});
