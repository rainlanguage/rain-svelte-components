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
  {label: 'Option 5'},
];

	let selectedNetwork ={label: 'None'};

</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Select</PageHeading>

	<ExampleHeading>Regular</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Select bind:value={selectedNetwork} items={options} />
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
