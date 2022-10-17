<script lang="ts">
	export let i, segment;
</script>

<span class="unknown-op" style="color:darkMagenta" data-type="unknown-op" data-index={i}
	>{segment.text}</span
>

<style lang="postcss">
	.unknown-op {
		@apply border-b border-red-400;
	}
</style>
