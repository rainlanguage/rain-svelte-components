<script lang='ts'>
  export let progress = 0;
  export let total = 0;
  export let color = "green";
  export let height = 4;

  let raiseOverMin = 0;

  $: overMax = progress > total;
  $: progressMin = total ? (progress / total) * 100 : 0;
  $: if (overMax) {
    raiseOverMin = total ? (total / progress) * 100 : 0;
  }

  let barHeight = "";

  $: if (height == 4) {
    barHeight = "h-4";
  } else if (height == 5) {
    barHeight = "h-5";
  }
</script>

<div class="relative w-full overflow-y-hidden">
  <div class="w-full {barHeight} overflow-hidden rounded-full bg-gray-300">
    <div class="h-full {color}" style="width:{progressMin}%" />
  </div>
  {#if overMax}
    <div
      class="absolute scale-y-110 border-l border-gray-500"
      style="top:-5px; bottom:-5px; left:{raiseOverMin}%"
    />
  {/if}
</div>

<style>
  .green {
    @apply bg-green-500;
  }
  .blue {
    @apply bg-blue-500;
  }
  .red {
    @apply bg-red-500;
  }
  .yellow {
    @apply bg-yellow-500;
  }
</style>
