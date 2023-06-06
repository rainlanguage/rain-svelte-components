/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, it, expect } from 'vitest';
import {
    cleanup,
    render,
    screen,
} from '@testing-library/svelte';
import Button from '../Button.svelte';
import { ChevronUp } from '@steeze-ui/heroicons';

const toHaveClass = (element: HTMLElement, ...classNames: string[]) => {
    const classes = element.getAttribute('class') || '';
    const classList = classes.split(' ');
    const missingClasses = classNames.filter(className => !classList.includes(className));

    return {
        pass: missingClasses.length === 0,
        message: () =>
            `Expected element to have class "${missingClasses.join(', ')}", but it doesn't.`,
    };
};
expect.extend({ toHaveClass });

describe("Button Tests", () => {

    it("should render Button component", async () => {
        render(Button);
        const buttonElement: HTMLInputElement = screen.getByRole("button");
        expect(buttonElement).toHaveClass('default');
        expect(buttonElement).toHaveClass('regular');
    });

    it('should render a Button with small size', async () => {
        render(Button, {
            props: {
                size: 'small'
            }
        });
        const buttonElement: HTMLInputElement = screen.getByRole("button");
        expect(buttonElement).toHaveClass('default');
        expect(buttonElement).toHaveClass('small');
    });

    it('should render a Button with primary variant', async () => {
        render(Button, {
            props: {
                variant: 'primary'
            }
        });
        const buttonElement: HTMLInputElement = screen.getByRole("button");
        expect(buttonElement).toHaveClass('primary');
        expect(buttonElement).toHaveClass('regular');
    });
    it('should render a disabled Button', async () => {
        const { container } = render(Button, {
            props: {
                disabled: true
            }
        });

        const buttonElement: HTMLInputElement = container.querySelector("button[disabled]")!;
        expect(buttonElement).toHaveClass('disabled');
        expect(buttonElement).toHaveClass('regular');
    });
    it('should render a Dual Button', async () => {
        render(Button, {
            props: {
                dual: 'left'
            }
        });
        render(Button, {
            props: {
                dual: 'right'
            }
        });
        const dualButtons = screen.getAllByRole("button");

        expect(dualButtons[0]).toHaveClass('default', 'regular', 'left');
        expect(dualButtons[1]).toHaveClass('default', 'regular', 'right');
    });

    it('should render a Dual Button with icons', async () => {
        render(Button, {
            props: {
                dual: 'left',
                icon: ChevronUp
            }
        });
        render(Button, {
            props: {
                dual: 'right',
            }
        });
        const dualButtons = screen.getAllByRole("button");

        expect(dualButtons[0]).toHaveClass('default', 'regular', 'left', 'withIcon');
        expect(dualButtons[1]).toHaveClass('default', 'regular', 'right');
    });

    it('should render buttons with different types', async () => {
        render(Button, {
            props: {
                type: 'reset'
            }
        });
        const buttonElement1: HTMLInputElement = screen.getByRole('button');
        expect(buttonElement1.getAttribute("type")).toBe('reset');
        cleanup();

        await render(Button, {
            props: {
                type: 'submit'
            }
        });
        const buttonElement2: HTMLInputElement = screen.getByRole('button');
        expect(buttonElement2.getAttribute("type")).toBe('submit');
    });
});
