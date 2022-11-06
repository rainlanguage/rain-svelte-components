<script lang="ts">

	export let color: string = "gray";

	export let size: "regular" | "larger" = "regular";

</script>

	<div class={`flex w-max ${color} rounded-3xl px-3 items-center dark:text-black ${size}`}>
		<slot></slot>
	</div>

<style lang="postcss">
  .green {
    @apply bg-green-500;
  }
  .blue {
    @apply bg-blue-500;
  }
  .red {
    @apply bg-red-700 text-white;
  }
  .yellow {
    @apply bg-yellow-500;
  }
	.gray {
		@apply bg-neutral-300;
	}
	.purple {
		@apply bg-purple-700 text-white;
	}

	.regular {
		@apply h-8 text-base py-1
	}

	.larger {
		@apply h-10 text-xl py-1.5
	}
</style>
