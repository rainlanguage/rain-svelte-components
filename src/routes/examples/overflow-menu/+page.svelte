<script lang="ts">
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import OverflowMenuItem from '$lib/overflow-menu/OverflowMenuItem.svelte';
	import OverflowMenu from '$lib/overflow-menu/OverflowMenu.svelte';

	let events: string[] = [];

	const editEvent = () => {
		events = ['Edit was clicked', ...events];
	};

	const deleteEvent = () => {
		events = ['Delete was clicked', ...events];
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Overflow Menu</PageHeading>
	<div class="dark:text-white">Component for an overflow menu.</div>
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
	<OverflowMenuItem on:click={item1}>Item 1</OverflowMenuItem>
	<OverflowMenuItem on:click={item2}>Item 2</OverflowMenuItem>
</OverflowMenu>
		`}</ExampleUsage
		>
	</Example>
</div>
