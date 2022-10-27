<script>
import { fly } from 'svelte/transition'

export let width = ""
export let placeHolder = "Info"

let visible, el, x, y

function show() {
    const rect = el.getBoundingClientRect()
    x = rect.left + rect.width / 2
    y = rect.top
    visible = true
}

function hide() { visible = false }
</script>

<span    
    bind:this={el}
    on:mouseenter={show}
    on:mouseleave={hide}
    class="relative">

    <slot></slot>
</span>

{#if visible}
<div
    transition:fly={{ y:10, duration:500 }}
    style="top:{y}px; left:{x}px;"
    class="{width} text-left rounded-md transform -translate-x-1/2 -translate-y-full px-3 py-2 fixed max-w-md text-xs bg-gray-800 text-gray-300 z-10 pointer-events-none">
    <slot  name="tip">{placeHolder}</slot>
</div>
{/if}