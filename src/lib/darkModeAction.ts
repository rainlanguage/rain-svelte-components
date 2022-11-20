import { writable } from "svelte/store"

export const darkMode = writable(false)

export const darkModeAction = (node: Element) => {
    darkMode.subscribe((dark) => {
        if (dark) {
            node.classList.add('dark')
        } else {
            node.classList.remove('dark')
        }
    })
}