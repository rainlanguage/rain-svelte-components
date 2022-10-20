<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type Item = {
    label: string,
    value?: any
    [key: string]: any
  }

  export let items:Item[] = [];
  export let value:Item= items[0];

  export let disabled = true;

  const dispatch = createEventDispatcher();

  export const validate = () => {
    return {
      ok: true,
      value,
    };
  };
</script>

// TODO: Fix colours when disabled. Add post-css to manage disabled and dark/light mode

<div class="flex w-full flex-col gap-y-2">
  <div class="self-start rounded-md border border-gray-500 text-white ">
    <select
      {disabled}
      class="text-light outline-none mr-2 border-none bg-transparent px-4 py-2
      text-black dark:text-white"
      bind:value
      on:change={() => {
        dispatch("change");
      }}
    >
      {#each items as item}
        <option class="text-black" value={item.value ? item.value : item}>{item.label}</option>
      {/each}
    </select>
  </div>
</div>
