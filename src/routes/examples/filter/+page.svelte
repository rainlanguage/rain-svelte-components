<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';

	import Filter from '$lib/filter/Filter.svelte';

	let items = ["24 hrs", "7 days", "30 days"];

	let value = items[1];
	
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Filter</PageHeading>
	<ExampleHeading>General use</ExampleHeading>
	<div class="dark:text-white">
	</div>
	<Example>
		<ExampleComponent>
		<Filter {items} bind:selected={value}></Filter>
			<p class="mt-4"><strong>Value to filter:</strong> {value}</p>
		</ExampleComponent>
		<ExampleUsage>{"<Filter {items} bind:selected={value}></Filter>"}</ExampleUsage>
	</Example>

</div>
