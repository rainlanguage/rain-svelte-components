<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Select from '$lib/Select.svelte';

	
	const options = [
		{label: 'Option 1'},
		{label: 'Option 2'},
		{label: 'Option 3'},
		{label: 'Option 4'},
	];

	let select1 = {label: "No option selected"};
	let select2 = {label: "No option selected"};

</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Select</PageHeading>

	<ExampleHeading>Regular</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Select bind:value={select1} items={options} />
			<div class="pt-4"><strong>Option selected:</strong> {select1.label}</div>
		</ExampleComponent>
		<ExampleUsage>
{`<script>
	const options = [...];
	let select;
</script>

<div>
	<Select bind:value={select} items={options} />
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
