<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function click() {
    dispatch("click");
  }

  export let label = null;
  export let variant = "primary";
  export let disabled = false;
  export let small = false;
  export let id = "";
  export let shrink = false;
  $: variantCalc = disabled ? "disabled" : variant;
</script>

{#if small}
  <button
    {disabled}
    {id}
    on:click={click}
    class={"rounded-lg transition-colors text-sm leading-none py-3 px-5 text-white " +
      variantCalc}
  >
    <slot />
    {#if !$$slots.default}
      {label}
    {/if}
  </button>
{:else if shrink}
  <button
    {disabled}
    {id}
    on:click={click}
    class={"transition-colors rounded-lg text-base leading-none py-3 px-5 text-white " +
      variantCalc}
  >
    <slot />
    {#if !$$slots.default}
      {label}
    {/if}
  </button>
{:else}
  <button
    {disabled}
    {id}
    on:click={click}
    class={"w-full transition-colors rounded-lg text-base leading-none py-3 px-5 text-white " +
      variantCalc}
  >
    <slot />
    {#if !$$slots.default}
      {label}
    {/if}
  </button>
{/if}

<style lang="postcss">
  .primary {
    @apply bg-gray-700 hover:bg-gray-600;
  }

  .secondary {
    @apply bg-gray-200;
  }

  .disabled {
    @apply cursor-not-allowed bg-gray-400;
  }
</style>
