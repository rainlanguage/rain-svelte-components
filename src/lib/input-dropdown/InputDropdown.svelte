<script lang="ts" context="module">
	import type { Item } from '$lib/input-dropdown/InputItem.svelte';

	export { Item };

	export const filterListByLabel = (searchLabel: string, itemList: Item[]): Item[] => {
		searchLabel = searchLabel.toLowerCase();
		const val: Item[] = [];

		itemList.forEach((item_) => {
			let itemLabel = item_.label.toLowerCase();
			if (itemLabel.includes(searchLabel)) {
				val.push(item_);
			}
		});

		return val;
	};
</script>

<script lang="ts">
	import InputItem from '$lib/input-dropdown/InputItem.svelte';

	export let items: Item[];
	export let value: any = null;
	export let placeholder: string = '';
	export let disabled = false;

	export let selectedItem: Item | undefined = undefined;

	// Styling
	/**
	 * Class definition to give styling to the container of the input
	 */
	export let classInput = 'default-input';

	/**
	 * Class definition to give styling to the container of the options/items
	 */
	export let classContainer: string | undefined = undefined;

	/**
	 * Class definition to give styling to the options/items
	 */
	export let classOptions: string | undefined = undefined;

	// Filter function
	export let filterFN: (searchLabel: string, itemList: Item[]) => Item[] = filterListByLabel;

	let isVisible = false;
	let blurTimeout: number | undefined;
	let label: any = null;
	let filteredItems: Item[];

	function showDiv() {
		clearTimeout(blurTimeout);
		isVisible = true;
	}

	function hideDiv() {
		blurTimeout = setTimeout(() => {
			isVisible = false;
		}, 100);
	}

	function handleInput(e: any) {
		updateFilteredItems(e.target.value);
	}

	function assignInfo() {
		value = selectedItem?.value;
		label = selectedItem?.label;
	}

	function updateFilteredItems(label_: string) {
		const _filtered = filterFN(label_, items);
		filteredItems = _filtered;
	}

	// When the selected item change, it will assign the value and label to show
	$: selectedItem && assignInfo();

	// When the label change, due to change on `selectedItem` or the `bind` value of the input
	// update the filtered items
	$: label && updateFilteredItems(label);

	$: filteredItems = items;
</script>

<div class="container">
	<input
		{disabled}
		class="w-full !outline-none {classInput}"
		type="text"
		{placeholder}
		on:focus={showDiv}
		on:blur={hideDiv}
		on:input={handleInput}
		bind:value={label}
	/>
	{#if isVisible}
		<div hidden={!isVisible} class="container-options">
			<InputItem bind:value={selectedItem} items={filteredItems} {classContainer} {classOptions} />
		</div>
	{/if}
</div>

<style lang="postcss">
	/* Defaults */
	.default-input {
		@apply bg-gray-200 font-light p-2 rounded;
	}

	/* Not customizable by consumer */
	.container {
		@apply w-full relative;
	}
	.container-options {
		@apply w-full absolute top-full left-0;
	}
</style>
