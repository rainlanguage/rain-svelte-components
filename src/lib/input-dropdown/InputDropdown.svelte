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
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
	 * Class definition to give styling to the container of the input
	 */
	export let classDropArrow = 'default-drop-arrow';

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

	export let disablePasteText: boolean = false;

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

		// Restart the filter
		filteredItems = items;
	}

	function handlePaste(e: any) {
		if (disablePasteText) {
			e.preventDefault();
			return;
		}
		const textPasted = e.clipboardData.getData('text');
		value = textPasted;
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

	let inputPointer: any;
</script>

<div class="container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="drop-arrow {classDropArrow}" on:click={() => inputPointer.focus()}>
		<Icon src={ChevronDown} />
	</div>
	<input
		on:paste={handlePaste}
		{disabled}
		class="w-full !outline-none {classInput}"
		type="text"
		{placeholder}
		on:focus={showDiv}
		on:blur={hideDiv}
		on:input={handleInput}
		bind:value={label}
		bind:this={inputPointer}
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
	.default-drop-arrow {
		@apply w-4 h-4 pt-1;
	}

	/* Not customizable by consumer */
	.container {
		@apply w-full relative;
	}
	.container-options {
		@apply w-full absolute top-full left-0 z-20;
	}
	.drop-arrow {
		@apply absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer;
	}
</style>
