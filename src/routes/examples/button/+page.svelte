<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Button from '$lib/Button.svelte';
	import { Heart, Square2Stack } from '@steeze-ui/heroicons';
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

	<ExampleHeading>Additional classes</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Button disabled classes="w-full text-center">Click me</Button>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Icons</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="space-y-1">
				<Button icon={Heart} solidIcon size={'small'} variant={'transparent'}>Favorite</Button>
				<Button icon={Square2Stack} size={'small'}>Copy this expression</Button>
				<Button icon={Square2Stack} size={'small'} variant={'primary'}>Copy this expression</Button>
				<Button icon={Square2Stack} variant={'black'}>Copy this expression</Button>
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<Button icon={} size={} variant={}>
	Button Text
</Button>`}
		</ExampleUsage>
	</Example>
</div>
