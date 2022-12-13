<script lang="ts">
	import { fade } from 'svelte/transition';
	export let type: 'error' = 'error';
	export let rect: DOMRect;
	export let message: string;

	let tip: HTMLDivElement;

	$: tipRect = tip?.getBoundingClientRect();

	$: style = `
    top: ${rect?.top - tipRect?.height}px;
    left: ${rect?.left}px;
    `;
</script>

<div bind:this={tip} transition:fade={{ duration: 100 }} class="tip" {style}>
	{message}
</div>

<style lang="postcss">
	.tip {
		@apply fixed bg-white rounded-sm text-red-600 z-50 text-sm px-2 py-1 border-gray-200 border;
	}
</style>
