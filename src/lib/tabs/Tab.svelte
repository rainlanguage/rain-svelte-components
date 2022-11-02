<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  export let href = '';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>


  <a
    class={`tab ${$selectedTab === tab ? "letsee" : ""}`}
    class:selected={$selectedTab === tab}
    on:click={() => selectTab(tab)}
    {href}
  >
    <slot />
  </a>
<div class="w-5 px-0"></div>

<style lang="postcss">
  .tab {
    @apply cursor-pointer border-b pb-2 px-3 font-sans tracking-tight text-gray-500
  }

  .selected {
    @apply border-b text-black border-black dark:border-white;
  }

</style>
