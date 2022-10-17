<script lang="ts">
import { onMount } from "svelte";

export let OpMeta


let ops = []
let opsSearch = []
let categories = []
let searchStr = ""
let active = 0

$: if (searchStr !== "") {
    opsSearch = ops.filter(op => op.name.includes(searchStr))
    getCategories()
} else {
    opsSearch = ops
    getCategories()
}

const getCategories = () => {
    let categorySet = new Set()
    Array.from(opsSearch).forEach(op => {
        categorySet.add(op.data.category)
    })
    categories = Array.from(categorySet)
}

onMount(()=>{
    ops = Array.from(OpMeta).map(op => op[1])
    opsSearch = ops
    getCategories()
})
</script>

<div class="flex flex-col h-full">
    <span class="text-lg p-2 font-semibold">Available words</span>
    <div>
        <input bind:value={searchStr} class="bg-transparent p-2 border-y border-gray-400 w-full" type="text" placeholder="Search"/>
    </div>
    <div class="flex flex-col text-sm overflow-scroll h-full cursor-pointer">
        {#each categories as category}
            <span class="bg-gray-300 p-2">
                {category}
            </span>
            <div class="flex flex-col">
                {#each opsSearch.filter(op => category == op.data.category) as op}
                <div 
                    class:activeOp={op.enum == active}
                    class="flex flex-col p-2 hover:bg-gray-200"
                    on:click={()=>{active = op.enum}}
                    >
                    <span class="font-mono">
                        {op.name}
                    </span>
                    <span class="text-gray-700">
                        {op.description}
                    </span>
                    {#if op.enum == active}
                    <div class="py-2 flex flex-col gap-y-1">
                        <span class="text-xs">EXAMPLE</span>
                        <div class="pl-2">
                            <span class="font-mono">{op.data.example}</span>
                        </div>
                        {#if op.data.parameters.length}
                        <span class="text-xs">PARAMETERS</span>
                        {#each op.data.parameters as parameter}
                        <div class="pl-2 flex flex-col items-start">
                            <span class="font-mono bg-green-200 inline">{parameter.name}</span>
                            <span class="">{parameter.description}</span>
                        </div>
                        {/each}
                        {/if}
                    </div>
                    {/if}
                </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .activeOp {
        @apply bg-gray-200
    }
</style>