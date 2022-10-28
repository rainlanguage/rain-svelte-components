<script lang="ts">
  import { tick } from "svelte";
  import jazzicon from "@metamask/jazzicon";

  let avatar:any, icon:any;
  export let address: string;
  export let width = 35;

  async function append() {
    await tick();
    if (icon) {
      icon.remove();
    }
    icon = jazzicon(width, jsNumberForAddress(address));
    avatar.appendChild(icon);
  }

  function jsNumberForAddress(address: string) {
    const addr = address.slice(2, 10);
    const seed = parseInt(addr, 16);
    return seed;
  }

  $: if (address) {
    append();
  }

  $: show = address
    ? "transition-opacity duration-500 opacity-100"
    : "transition-opacity duration-500 opacity-0";
</script>

<div class="relative" style="height:{width}px; width:{width}px">
  <div style="height:{width}px" bind:this={avatar} class={show} />

  {#if !address}
    <div class="absolute inset-0 animate-pulse rounded-full bg-gray-200" />
  {/if}
</div>
