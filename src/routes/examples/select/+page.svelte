<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Select from '$lib/Select.svelte';

	const options = [
		{ label: 'Option 1' },
		{ label: 'Option 2' },
		{ label: 'Option 3' },
		{ label: 'Option 4' }
	];

	const options2 = [
		{ label: 'Option 1', value: 'opt1' },
		{ label: 'Option 2', value: 'opt2' },
		{ label: 'Option 3', value: 'opt3' },
		{ label: 'Option 4', value: 'opt4' }
	];

	let select1 = -1,
		select2: any = -1,
		select3;
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Select</PageHeading>

	<ExampleHeading>Labels only</ExampleHeading>
	<div>
		If no value is provided in the options array, the index will be used. Value is -1 before any
		selection is made.
	</div>
	<Example>
		<ExampleComponent>
			<Select bind:value={select2} items={options2} />
			<div class="pt-4">
				<strong>Option selected:</strong>
				{options[select1]?.label || 'none selected'}
			</div>
			<div><strong>Option value:</strong> {select2}</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [
		{ label: 'Option 1' },
		{ label: 'Option 2' },
		{ label: 'Option 3' },
		{ label: 'Option 4' }
	];
	let select;
</script>

<div>
	<Select bind:value={select} items={options} />
	<strong>Option label:</strong>{options[select]?.label || 'none selected'}
	<strong>Option value:</strong> {select}
</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Labels and values</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Select bind:value={select2} items={options2} />
			<div class="pt-4">
				<strong>Option selected:</strong>
				{options2.find((opt) => opt?.value == select2)?.label || 'none selected'}
			</div>
			<div><strong>Option value:</strong> {select2}</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [
		{ label: 'Option 1', value: 'opt1' },
		{ label: 'Option 2', value: 'opt2' },
		{ label: 'Option 3', value: 'opt3' },
		{ label: 'Option 4', value: 'opt4' }
	];
	let select;
</script>

<div>
	<Select bind:value={select} items={options} />
	<strong>Option selected:</strong>
	{options.find((opt) => opt?.value == select)?.label || 'none selected'}
	<strong>Option value:</strong> {select}
</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Disabled</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Select bind:value={select2} disabled={true} items={options} />
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [...];
	let select;
</script>

<div>
	<Select bind:value={select} items={options} disabled={true} />
</div>`}
		</ExampleUsage>
	</Example>
</div>
