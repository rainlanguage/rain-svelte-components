<script lang="ts">
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
	import PageHeading from '$lib/PageHeading.svelte';
	import Button from '$lib/package/Button.svelte';

	export const required = async (value: any): Promise<true | { error: string }> => {
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve('');
			}, 1000);
		});
		if (value) {
			return { error: 'An error message' };
		}
		return true;
	};

	let debouncedValue: string;
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Input</PageHeading>

	<ExampleHeading>Without validation</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button>Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
