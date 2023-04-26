<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import Input from '$lib/Input.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';

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
			<Input placeholder="Placeholder">
				<span slot="label">Input name</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>With validation</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input validator={required}>
				<span slot="label">Input name</span>
				<span slot="description"
					>Any input will result in a validation error after blurring focus.</span
				>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>With debounce</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input bind:value={debouncedValue} debounce debounceTime={500}>
				<span slot="label">Input name</span>
				<span slot="description">Input will update after 500ms of no changes.</span>
			</Input>
			<div class="pt-4">Debounced value: {debouncedValue}</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Disabled</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input disabled>
				<span slot="label">Input name</span>
				<span slot="description">This field is disabled</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>With placeholder</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input placeholder={'Your placeholder'}>
				<span slot="label">Input name</span>
				<span slot="description">The description have a placeholder</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>With Icons</ExampleHeading>
	<div>
		Pass a function to the <span class="font-mono">iconAction</span>
		prop, that will be called when the icon is clicked.
	</div>
	<Example>
		<ExampleComponent>
			<Input
				icon={MagnifyingGlass}
				iconPos="end"
				iconAction={() => {
					alert('clicked the icon!');
				}}
			>
				<span slot="label">Input name</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<Example>
		<ExampleComponent>
			<Input icon={MagnifyingGlass} iconPos="end">
				<span slot="label">Input name</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Text area</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Input type="textarea">
				<span slot="label">Input name</span>
				<span slot="description">Description</span>
			</Input>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
