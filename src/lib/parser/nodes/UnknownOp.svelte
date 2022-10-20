<script lang="ts">
	export let i, segment;
</script>

<span
	class="unknown-op text-fuchsia-700 dark:text-fuchsia-400"
	data-type="unknown-op"
	data-index={i}>{segment.text}</span
>

<style lang="postcss">
	.unknown-op {
		@apply border-b border-red-400;
	}
</style>
