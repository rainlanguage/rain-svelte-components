<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import Button from '$lib/Button.svelte';
	import { ChevronLeft, ChevronRight, Heart, Square2Stack } from '@steeze-ui/heroicons';
	import OverflowMenu from '$lib/overflow-menu/OverflowMenu.svelte';
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

	<ExampleHeading>Dual button</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-3">
				<div class="flex">
					<Button variant="transparent" dual={'left'}>Left</Button>
					<Button variant="transparent" dual={'right'}>Right</Button>
				</div>
				<div class="flex">
					<Button variant="transparent" dual={'left'} size="small">Left</Button>
					<Button variant="transparent" dual={'right'} size="small">Right</Button>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage
			>{`
<div class="flex">
	<Button variant="transparent" dual={'left'} size="small">Left</Button>
	<Button variant="transparent" dual={'right'} size="small">Right</Button>
</div>
		`}</ExampleUsage
		>
	</Example>

	<ExampleHeading>Dual button with icons</ExampleHeading>
	By default the icon will be on the left side of the {`<slot>`} on the component
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-3">
				<div class="flex">
					<Button variant="transparent" dual={'left'} icon={ChevronLeft}>Left</Button>
					<Button variant="transparent" dual={'right'} icon={ChevronRight} iconPosition={'right'}
						>Right</Button
					>
				</div>
				<div class="flex">
					<Button variant="transparent" dual={'left'} size="small" icon={ChevronLeft}>Left</Button>
					<Button
						variant="transparent"
						dual={'right'}
						size="small"
						icon={ChevronRight}
						iconPosition={'right'}>Right</Button
					>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>{``}</ExampleUsage>
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
				<div>Only icon</div>
				<Button icon={Heart} size={'small'} variant={'black'} />
			</div>
		</ExampleComponent>
		<ExampleUsage>
			{`<Button icon={} size={} variant={}>
	Button Text
</Button>`}
		</ExampleUsage>
	</Example>
</div>
