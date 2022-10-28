<script lang="ts">
  export let heading = null as null | string;
  export let classes = null as null | string;
  let type = typeof classes;
</script>

<div
  class={type == "string"
    ? `${classes} flex flex-col items-start gap-y-4 rounded-xl bg-gray-800 p-8 drop-shadow-sm filter`
    : "flex flex-col items-start gap-y-4 rounded-xl bg-gray-800 p-8 drop-shadow-sm filter"}
>
  {#if heading}
    <span class="text-white mb-2 text-lg font-semibold">{heading}</span>
  {/if}
  <slot name="description" />
  <slot />
</div>
