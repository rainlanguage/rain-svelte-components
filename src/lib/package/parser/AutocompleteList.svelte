<script lang="ts">
import { onDestroy, onMount } from "svelte";

export let autocompleteSelection: Selection, OpMeta
const parentElement = autocompleteSelection.anchorNode.parentElement
const selection = autocompleteSelection

let active = 0
let popup, resultsBox
let initialScroll = window.scrollY
let liveScroll
let mouseY, mouseX
let offsetY

$: text = parentElement.textContent
$: opRect = parentElement.getBoundingClientRect()
$: resultsBoxHeight = resultsBox ? resultsBox.getBoundingClientRect().height : 0
$: popupHeight = popup ? popup.getBoundingClientRect().height : 0
$: showAbove = resultsBoxHeight > window.innerHeight - opRect.bottom || popupHeight > window.innerHeight - opRect.bottom
$: bottom = window.innerHeight - opRect.top + liveScroll - initialScroll
$: top = opRect.bottom + initialScroll - liveScroll
$: left = opRect.right
$: results = Array.from(OpMeta).filter(entry => entry[1].name.startsWith(text))

const select = (i) => {
    const selection = window.getSelection();
    parentElement.innerHTML = results[i][1].name
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(parentElement);
    range.collapse(false);
    autocompleteSelection.addRange(range);
    parentElement.focus();
    autocompleteSelection = null
}

const onKeyDown = (e) => {
    if (e.key == "ArrowUp") {
        e.preventDefault()
       active--
       if (active < 0) active = results.length - 1
    }
    if (e.key == "ArrowDown") {
        e.preventDefault()
        active++
        if (active > results.length - 1) active = 0
    }
    if (e.key == "Enter") {
        e.preventDefault()
        select(active)
    }
    if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
        autocompleteSelection = null
    }
}

 const onHover = (node) => {
    node.addEventListener('mouseover', (e)=>{
        if (e.clientX !== mouseX || e.clientY !== mouseY) {
            active = node.getAttribute('data-index')
            mouseX = e.clientX
            mouseY = e.clientY
        }
    })
 }

 const onclick = (e) => {
    if (!popup.contains(e.target)) {
        autocompleteSelection = null
	}
 }

onMount(()=>{
        // moving the autocomplete list to the body to escape any other styling etc
		document.body.appendChild(popup)
        document.addEventListener('keydown', onKeyDown)
        document.body.addEventListener('click', onclick);
	})

onDestroy(()=>{
    document.removeEventListener('keydown', onKeyDown)
    document.body.removeEventListener('click', onclick)
})

</script>

<div 
    bind:this={popup} 
    class="fixed text-sm text-gray-200 rounded-sm z-20 flex flex-row"
    class:showAbove
    class:showBelow={!showAbove}
    style={showAbove ? `bottom: ${bottom}px; left: ${left}px`: `top: ${top}px; left: ${left}px`}
    >
    <div bind:this={resultsBox} class="bg-gray-800 border border-gray-600">
        {#each results as result, i}
        {@const activeRes = i == active}
            <div 
                on:click={()=>{select(i)}} class:inactive={!activeRes} class:active={activeRes}
                class="p-1 cursor-pointer flex flex-col w-80"
                use:onHover
                data-index={i}
                >
                <span class="font-mono">{result[1].name}</span>
            </div>
        {/each}
    </div>
    {#if autocompleteSelection && results.length}
    <div class="bg-gray-800 border border-gray-600 w-80 p-2 flex flex-col gap-y-2">
        <span>{results[active][1].description}</span>
        <span class="text-gray-400 text-xs">EXAMPLE</span>
        <span class="font-mono">{results[active][1].data.example}</span>
        <span class="text-gray-400 text-xs">PARAMETERS</span>
        {#each results[active][1].data.parameters as parameter}
        <span class="font-mono">{parameter.name}</span>
        <span class="text-gray-400">{parameter.description}</span>
        {/each}
    </div>
    {/if}
</div>

<svelte:window bind:scrollY={liveScroll} />

<style lang="postcss">
    .active {
        @apply bg-blue-500
    }

    .inactive {
        @apply bg-gray-800
    }

    .showAbove {
        @apply items-end
    }

    .showBelow {
        @apply items-start
    }
</style>