<script lang="ts">
	import { fade } from 'svelte/transition';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import OverflowMenuItem from '$lib/overflow-menu/OverflowMenuItem.svelte';
	import OverflowMenu from '$lib/overflow-menu/OverflowMenu.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';

	let events: string[] = [];
	let events2: string[] = [];

	const editEvent = () => {
		events = ['Edit was clicked', ...events];
	};

	const deleteEvent = () => {
		events = ['Delete was clicked', ...events];
	};

	const editEvent2 = () => {
		events2 = ['Edit was clicked', ...events2];
	};

	const deleteEvent2 = () => {
		events2 = ['Delete was clicked', ...events2];
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Overflow Menu</PageHeading>
	<div class="dark:text-white">Component for an overflow menu.</div>

	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<OverflowMenu>
				<OverflowMenuItem on:click={editEvent}>Edit</OverflowMenuItem>
				<OverflowMenuItem on:click={deleteEvent}
					><span class="text-red-600">Delete</span></OverflowMenuItem
				>
			</OverflowMenu>
			<div class="flex flex-col gap-y-1 mt-4 text-gray-700 dark:text-gray-300">
				{#each events as event}
					<span>{event}</span>
				{/each}
			</div>
		</ExampleComponent>
		<ExampleUsage
			>{`
<script>
	const item1 = () => {
		// click for item1
	}

	const item2 = () => {
		// click for item1
	}
</script>
<OverflowMenu>
	<OverflowMenuItem on:click={item1}>Edit</OverflowMenuItem>
	<OverflowMenuItem on:click={item2}>Delete</OverflowMenuItem>
</OverflowMenu>
		`}</ExampleUsage
		>
	</Example>

	<ExampleHeading>Custom button</ExampleHeading>
	<Example>
		<ExampleComponent>
			<OverflowMenu>
				<span class="cursor-pointer" slot="button">Click me for overflow</span>
				<OverflowMenuItem on:click={editEvent2}>Edit</OverflowMenuItem>
				<OverflowMenuItem on:click={deleteEvent2}
					><span class="text-red-600">Delete</span></OverflowMenuItem
				>
			</OverflowMenu>
			<div class="flex flex-col gap-y-1 mt-4 text-gray-700 dark:text-gray-300">
				{#each events2 as event}
					<span>{event}</span>
				{/each}
			</div>
		</ExampleComponent>
		<ExampleUsage
			>{`
<script>
	const item1 = () => {
		// click for item1
	}

	const item2 = () => {
		// click for item1
	}
</script>
<OverflowMenu>
	<span class="cursor-pointer" slot="button">Click me for overflow</span>
	<OverflowMenuItem on:click={item1}>Edit</OverflowMenuItem>
	<OverflowMenuItem on:click={item2}>Delete</OverflowMenuItem>
</OverflowMenu>
		`}</ExampleUsage
		>
	</Example>
</div>
