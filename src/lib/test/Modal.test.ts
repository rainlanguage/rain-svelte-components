import { describe, it, expect } from 'vitest';
import {
    fireEvent,
    render,
} from '@testing-library/svelte';
import Modal from '../Modal.svelte'

describe("Modal Tests", () => {

    it("should render the Modal when open is not defined", async () => {
        const { container } = render(Modal);
        const modalDiv = container.querySelector('.z-50');
        expect(modalDiv?.children.length).toBe(1);
    });

    it("should render the Modal when open is true", async () => {
        const { container } = render(Modal, { open: true });
        const modalDiv = container.querySelector('.z-50');
        expect(modalDiv?.children.length).toBe(1);
    });

    it("should not render the Modal when open is false", async () => {
        const { container } = render(Modal, { open: false });
        const modalDiv = container.querySelector('.z-50');
        expect(modalDiv?.children.length).toBe(0);
    });

    it("should close the modal when clicking outside if disableOutsideClickClose is not defined", async () => {
        const { container, component } = render(Modal, {
            open: true,
            disableOutsideClickClose: false
        });
        // open == true
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(true);

        // fire click event
        await fireEvent.click(container.querySelector('.z-50')?.firstChild);

        // open == false
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(false);
    });

    it("should close the modal when clicking outside if disableOutsideClickClose is false", async () => {
        const { container, component } = render(Modal, {
            open: true,
            disableOutsideClickClose: false
        });

        // open == true
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(true);

        // fire click event
        await fireEvent.click(container.querySelector('.z-50')?.firstChild);

        // open == false
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(false);
    });

    it("should not close the modal when clicking outside if disableOutsideClickClose is true", async () => {
        const { container, component } = render(Modal, {
            open: true,
            disableOutsideClickClose: true
        });

        // open == true
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(true);

        // fire click event
        await fireEvent.click(container.querySelector('.z-50')?.firstChild);

        // open == false
        expect(component.$$.ctx[component.$$.props["open"]]).toBe(true);

    });

});
