<script>
	import { createEventDispatcher } from 'svelte';

	export let variant = 'primary';
	export let disabled = false;
	export let small = false;
	export let id = '';
	export let shrink = false;
	$: variantCalc = disabled ? 'disabled' : variant;
</script>

{#if small}
	<button {disabled} {id} on:click class={`text-sm ${variantCalc}`}>
		<slot />
	</button>
{:else}
	<button {disabled} {id} on:click class={'text-base' + variantCalc}>
		<slot />
	</button>
{/if}

<style lang="postcss">
	.button {
		@apply leading-none py-3 px-5 rounded-lg transition-colors text-white dark:text-black;
	}
	.primary {
		@apply bg-blue-700 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-200;
	}

	.secondary {
		@apply bg-gray-200 hover:bg-gray-100;
	}

	.disabled {
		@apply cursor-not-allowed bg-gray-400;
	}
</style>
