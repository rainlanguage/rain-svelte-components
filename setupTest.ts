import { vi } from "vitest"

global.ResizeObserver = require('resize-observer-polyfill')

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mocking animate function
const animationFunction = function (this: any) {
    const obj = {
        onfinish: vi.fn(),
        addEventListener: vi.fn(),
    };

    Promise.resolve().then(async () => {
        obj.onfinish();
        obj.addEventListener();
    });

    return obj as unknown as Animation;
};
HTMLDivElement.prototype.animate = animationFunction;
HTMLSpanElement.prototype.animate = animationFunction;