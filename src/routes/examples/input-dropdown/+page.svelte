<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import InputDropdown, { type Item } from '$lib/input-dropdown/InputDropdown.svelte';

	const options1 = [
		{ label: 'Option 1', value: 'Value1' },
		{ label: 'Option 2', value: 'Value2' },
		{ label: 'Option 3', value: 'Value3' },
		{ label: 'Option 4', value: 'Value4' }
	];
	const options2 = [
		{ label: 'Option 1', value: 'Value1' },
		{ label: 'Option 2', value: 'Value2' },
		{ label: 'Option 3', value: 'Value3' },
		{ label: 'Option 4', value: 'Value4' }
	];
	const options3 = [
		{ label: 'Option 1', value: 'Value1' },
		{ label: 'Option 2', value: 'Value2' },
		{ label: 'Option 3', value: 'Value3' },
		{ label: 'Option 4', value: 'Value4' }
	];

	let selectedValue1: any;
	let selectedItem1: Item;
	let selectedValue2: any;
	let selectedItem2: Item;
	let selectedValue3: any;
	let selectedItem3: Item;
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Input dropdown</PageHeading>

	<ExampleHeading>Basic usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<InputDropdown
				bind:value={selectedValue1}
				bind:selectedItem={selectedItem1}
				items={options1}
				placeholder="Select interpreter"
			/>
			<p>
				Selected Value: {selectedValue1}
			</p>
			<p>
				Selected Item: {JSON.stringify(selectedItem1, null, 2)}
			</p>
		</ExampleComponent>
		<ExampleUsage
			>{`const options = [
	{ label: 'Option 1', value: 'Value1' },
	{ label: 'Option 2', value: 'Value2' },
	{ label: 'Option 3', value: 'Value3' },
	{ label: 'Option 4', value: 'Value4' }
];

<InputDropdown 
	bind:value={selectedDeployer}
	bind:selectedItem
	items={options}
	placeholder="Select interpreter"
/>`}</ExampleUsage
		>
	</Example>

	<ExampleHeading>Define styling</ExampleHeading>
	<Example>
		<ExampleComponent>
			<InputDropdown
				bind:value={selectedValue2}
				bind:selectedItem={selectedItem2}
				items={options2}
				placeholder="Select interpreter"
				classInput="text-neutral-600 border border-neutral-100 bg-white rounded-md px-0 py-1 text-xs w-full pl-2"
				classContainer="max-h-28 text-neutral-600 border-[1px] border-gray-400 bg-white rounded-md text-xs shadow cursor-default font-mono"
			/>
			<p>
				Selected value: {selectedValue2}
			</p>
			<p>
				Selected Item: {JSON.stringify(selectedItem2, null, 2)}
			</p>
		</ExampleComponent>
		<ExampleUsage
			>{`const options = [
	{ label: 'Option 1', value: 'Value1' },
	{ label: 'Option 2', value: 'Value2' },
	{ label: 'Option 3', value: 'Value3' },
	{ label: 'Option 4', value: 'Value4' }
];

<InputDropdown
	bind:value={selectedDeployer}
	bind:selectedItem
	items={options}
	placeholder="Select interpreter"
	classInput="text-neutral-600 border border-neutral-100 bg-white rounded-md px-0 py-1 text-xs w-full pl-2"
	classContainer="max-h-28 text-neutral-600 border-[1px] border-gray-400 bg-white rounded-md text-xs shadow cursor-default font-mono"
/>`}</ExampleUsage
		>
	</Example>

	<ExampleHeading>Disable paste text</ExampleHeading>
	<Example>
		<ExampleComponent>
			<InputDropdown
				disablePasteText
				bind:value={selectedValue3}
				bind:selectedItem={selectedItem3}
				items={options3}
				placeholder="Select interpreter"
			/>
			<p>
				Selected value: {selectedValue3}
			</p>
			<p>
				Selected Item: {JSON.stringify(selectedItem3, null, 2)}
			</p>
		</ExampleComponent>
		<ExampleUsage
			>{`const options = [
	{ label: 'Option 1', value: 'Value1' },
	{ label: 'Option 2', value: 'Value2' },
	{ label: 'Option 3', value: 'Value3' },
	{ label: 'Option 4', value: 'Value4' }
];

<InputDropdown
	disablePasteText
	bind:value={selectedDeployer}
	bind:selectedItem
	items={options}
	placeholder="Select option. It cannot paste text"
/>`}</ExampleUsage
		>
	</Example>
</div>
