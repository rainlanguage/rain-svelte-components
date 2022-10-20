<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Button from '$lib/Button.svelte';

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
	<PageHeading>Button</PageHeading>

	<ExampleHeading>Regular</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button>Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Small</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button size="small">Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Primary</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button variant="primary">Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Disabled</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button disabled>Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
