<script>
	export let variant = 'default';
	export let disabled = false;
	export let size = 'regular';
	$: variantCalc = disabled ? 'disabled' : variant;
</script>

<button {disabled} on:click class={`button ${variantCalc} ${size}`}>
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply leading-none rounded-lg transition-colors text-white dark:text-black;
	}

	.small {
		@apply py-2 px-3 text-sm;
	}

	.regular {
		@apply py-2 px-5 text-base;
	}
	.default {
		@apply bg-gray-700 hover:bg-gray-600;
	}
	.primary {
		@apply bg-blue-700 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-200;
	}

	.secondary {
		@apply bg-blue-500 hover:bg-blue-400;
	}

	.disabled {
		@apply cursor-not-allowed bg-gray-400;
	}
</style>
