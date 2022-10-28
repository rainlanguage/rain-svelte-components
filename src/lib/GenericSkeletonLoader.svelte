<script lang="ts">
  export let show: any ="";
  export let flexGrow: any = "";

  $: wrapperClasses = flexGrow ? "relative flex-1" : "relative";

  $: showContent = show
    ? "transition-opacity duration-500 opacity-100"
    : "transition-opacity duration-500 opacity-0";
  $: showLoader = show
    ? "absolute bg-gray-200 inset-0 rounded-2xl transition-opacity duration-1000 opacity-0"
    : "absolute bg-gray-200 inset-0 rounded-2xl transition-opacity duration-300 animate-pulse";
</script>

<div class={wrapperClasses}>
  <div class={showContent}>
    <slot />
  </div>
  {#if !show}
    <div class={showLoader} />
  {/if}
</div>
