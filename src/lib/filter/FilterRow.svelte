<script lang="ts">
	export let color: string = 'gray';
	export let options: any[];
	export let value: any;
	export let selectedIndex: number = 1;

	const filterSelection = (i: number) => {
		selectedIndex = i;
	};

	$: value = options[selectedIndex]?.value || options[selectedIndex].label;

	// TODO: Filter the objects?
</script>

<div
	class="flex bg-gray-100 dark:bg-gray-800 w-max font-medium text-sm rounded-2xl px-2 py-1.5 space-x-0.5"
>
	{#each options as item, i}
		<button
			class:active={selectedIndex === i}
			class:normal={!(selectedIndex === i)}
			on:click={() => {
				filterSelection(i);
			}}
		>
			{item.label}
		</button>
	{/each}
</div>

<style lang="postcss" global>
	:local(.normal) {
		@apply text-neutral-600 dark:text-gray-100 px-2.5 py-1.5 transition-colors;
	}

	:local(.active) {
		@apply bg-white text-black dark:text-white dark:bg-gray-700 rounded-xl px-2.5;
	}
</style>
