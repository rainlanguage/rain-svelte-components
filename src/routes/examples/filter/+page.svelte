<script lang="ts">
	import FilterRow from '$lib/filter/FilterRow.svelte';

	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';

	import FilterGroup from '$lib/filter/FilterGroup.svelte';
	import FilterSet from '$lib/filter/FilterSet.svelte';

	let options = [{ label: '24 hrs' }, { label: '7 days' }, { label: '30 days' }];

	let values = options[1];
	let filterGroupFilters: any[];
	let value: any;
	let exclusiveValue: any;

	let filterSetOptions = [
		{ label: 'Option 1' },
		{ label: 'Option 2' },
		{ label: 'Option 3' },
		{ label: 'Option 4' }
	];

	let exclusiveFilterSetOptions = [
		{ label: 'Option 1', value: 1 },
		{ label: 'Option 2', value: 2 },
		{ label: 'Option 3', value: 3 },
		{ label: 'Option 4', value: 4 }
	];
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Filter</PageHeading>
	<ExampleHeading>Filter row</ExampleHeading>
	<div class="dark:text-white">
		Pass an options array as with a Select component. Bind to the value prop to get the selected
		value. If no value key is set in the options array, the label will be returned as the selected
		value.
	</div>
	<Example>
		<ExampleComponent>
			<FilterRow {options} bind:value />
			<p class="mt-4"><strong>Value to filter:</strong> {value}</p>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [{ label: '24 hrs' }, { label: '7 days' }, { label: '30 days' }];
	let value;
</script>

<div>
	<FilterRow options={filterSetOptions} bind:value />
	<p><strong>Selected values:</strong>{value}</p>
</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Filter set</ExampleHeading>
	<div class="dark:text-white">
		Pass options in the same way as to a Select component. Bind to the value prop to get the array
		of selected values. Values in the options object are optional, if none are provided the label
		will be returned.
	</div>
	<Example>
		<ExampleComponent>
			<FilterSet options={filterSetOptions} bind:value={values} />
			<p class="mt-4"><strong>Selected values:</strong> {values}</p>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [
		{ label: 'Option 1' },
		{ label: 'Option 2' },
		{ label: 'Option 3' },
		{ label: 'Option 4' }
	];
	let values;
</script>

<div>
	<FilterSet options={filterSetOptions} />
	<p><strong>Selected values:</strong>{values}</p>
</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Exclusive filter set</ExampleHeading>
	<div class="dark:text-white">
		If the prop 'exclusive' is set to true, only one filter can be selected at a time. In this case,
		the binding to the value prop will return the selected value (not an array).
	</div>
	<Example>
		<ExampleComponent>
			<FilterSet options={exclusiveFilterSetOptions} bind:value={exclusiveValue} exclusive />
			<p class="mt-4"><strong>Selected value:</strong> {exclusiveValue}</p>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [
		{ label: 'Option 1', value: 1 },
		{ label: 'Option 2', value: 2 },
		{ label: 'Option 3', value: 3 },
		{ label: 'Option 4', value: 4 }
	];
	let values;
</script>

<div>
	<FilterSet options={filterSetOptions} exclusive />
	<p><strong>Selected values:</strong>{values}</p>
</div>`}
		</ExampleUsage>
	</Example>

	<ExampleHeading>Filter group</ExampleHeading>
	<div class="dark:text-white">Use to create an accordion to keep filters in.</div>
	<Example>
		<ExampleComponent>
			<FilterGroup name="Filter group">
				<div class="flex gap-x-2">
					<FilterSet options={filterSetOptions} bind:value={filterGroupFilters} />
				</div>
			</FilterGroup>
			<p class="mt-4"><strong>Selected values:</strong> {filterGroupFilters}</p>
		</ExampleComponent>
		<ExampleUsage>
			{`<script>
	const options = [
		{ label: 'Option 1' },
		{ label: 'Option 2' },
		{ label: 'Option 3' },
		{ label: 'Option 4' }
	];
	let values;
</script>

<div>
	<FilterGroup name="Filter group">
		<div class="flex gap-x-2">
			<FilterSet options={filterSetOptions} />
		</div>
	</FilterGroup>
	<p><strong>Selected values:</strong>{values}</p>
</div>`}
		</ExampleUsage>
	</Example>
</div>
