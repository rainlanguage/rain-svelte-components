<script lang="ts">
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';

	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';

	import Example from '$lib/_docs/Example.svelte';

	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import InputDropdown, { type Item } from '$lib/input-dropdown/InputDropdown.svelte';
	import { stringify } from 'postcss';

	const items = [
		{
			label: 'Driving',
			value: 'Engine'
		},
		{
			label: 'Walking',
			value: 'Feet'
		},
		{
			label: 'Fast walking',
			value: 'Feet'
		},
		{
			label: 'Flying',
			value: 'Turbine'
		}
	];

	let value1: any;
	let value2: any;
	let value3: any;

	let selecteditem1: Item;
	let selecteditem2: Item;
	let selecteditem3: Item;

	/**
	 * This to NOT include the text provide
	 */
	const filterFunction = (searchLabel: string, itemList: Item[]): Item[] => {
		searchLabel = searchLabel.toLowerCase();
		const val: Item[] = [];

		itemList.forEach((item_) => {
			let itemLabel = item_.label.toLowerCase();
			if (!itemLabel.includes(searchLabel)) {
				val.push(item_);
			}
		});

		return val;
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Select Headless</PageHeading>

	<ExampleHeading>Basic/Default usage</ExampleHeading>
	<div class="dark:text-white">Explanation here.</div>
	<Example>
		<ExampleComponent>
			<div>
				<InputDropdown bind:value={value1} {items} bind:selectedItem={selecteditem1} />
			</div>
			<div>
				<p class="break-words">
					Selected item: {selecteditem1
						? JSON.stringify(selecteditem1, null, 2)
						: 'Not option selected'}
				</p>

				<p class="break-words">
					Selected vaue: {value1 ? value1 : 'Not option selected'}
				</p>
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<div>\n\t<InputDropdown bind:value {items} />\n</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Providing styling</ExampleHeading>
	<div class="dark:text-white">Explanation here.</div>
	<Example>
		<ExampleComponent>
			<div>
				<InputDropdown
					bind:value={value2}
					{items}
					bind:selectedItem={selecteditem2}
					classInput="bg-red-200 text-green-800 p-4 rounded-full"
					classDropArrow="w-6 h-6 pt-1 pr-2"
				/>
			</div>
			<div>
				<p class="break-words">
					Selected item: {selecteditem2
						? JSON.stringify(selecteditem2, null, 2)
						: 'Not option selected'}
				</p>

				<p class="break-words">
					Selected vaue: {value2 ? value2 : 'Not option selected'}
				</p>
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<div>\n\t<InputDropdown\n\t  bind:valuen\n\t  {items}\n\t  classInput="bg-red-200 text-green-800 p-4 rounded-full"\n\t  classDropArrow="w-6 h-6 pt-1 pr-2"\n\t/>\n</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Providing filtering</ExampleHeading>
	<div class="dark:text-white">
		Explanation here. The example filter the items that NOT have the text provided.
	</div>
	<Example>
		<ExampleComponent>
			<div>
				<InputDropdown
					bind:value={value3}
					{items}
					filterFN={filterFunction}
					bind:selectedItem={selecteditem3}
				/>
			</div>
			<div>
				<p class="break-words">
					Selected item: {selecteditem3
						? JSON.stringify(selecteditem3, null, 2)
						: 'Not option selected'}
				</p>

				<p class="break-words">
					Selected vaue: {value3 ? value3 : 'Not option selected'}
				</p>
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<div>\n\t<InputDropdown bind:value {items} filterFN={filterFunction} />\n</div>`}
		</ExampleUsage>
	</Example>
</div>
