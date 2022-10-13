<script lang="ts">
	import { page } from '$app/stores';
	import NavItem from '$lib/NavItem.svelte';
	import Switch from '$lib/package/Switch.svelte';
	import '../app.postcss';

	let checked: boolean;
</script>

<div class:dark={checked}>
	<div
		class="flex justify-between p-3 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
	>
		<span class="dark:text-gray-200 text-gray-800 text-large">Rain component library</span>
		<Switch bind:checked />
	</div>
	<div class="bg-white dark:bg-gray-900 min-h-screen flex">
		<div class="w-56 border-r border-gray-200 dark:border-gray-700 flex flex-col">
			<NavItem link="/">
				<span class="title">Home</span>
			</NavItem>
			<NavItem>
				<span class="title">Forms</span>
			</NavItem>
			<NavItem link="/examples/input">
				<span>Input</span>
			</NavItem>
			<NavItem link="/examples/switch">
				<span>Switch</span>
			</NavItem>
		</div>
		<div class="p-8 w-full">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-gray-800 dark:text-gray-100 font-semibold;
	}
	a {
		@apply text-gray-600 dark:text-gray-400;
	}
</style>
