<script lang="ts">
	import NavItem from '$lib/_docs/NavItem.svelte';
	import Button from '$lib/Button.svelte';
	import Switch from '$lib/Switch.svelte';
	import { connected, defaultEvmStores, signerAddress } from 'svelte-ethers-store';
	import '../app.postcss';

	let checked: boolean;
</script>

<div class:dark={checked}>
	<nav
		class="flex justify-between px-3 h-12 fixed inset-x-0 items-center dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
	>
		<span class="dark:text-gray-200 text-gray-800 text-large">Rain component library</span>
		<div>
			<Button
				size="small"
				disabled={Boolean($signerAddress)}
				on:click={() => {
					defaultEvmStores.setProvider();
				}}
				>{#if $signerAddress}
					Connected
				{:else}
					Connect
				{/if}
			</Button>
			<Switch bind:checked />
		</div>
	</nav>
	<div class="dark:bg-gray-900 flex top-12 fixed inset-x-0 bottom-0">
		<div class="w-56 border-r border-gray-200 dark:border-gray-700 flex flex-col">
			<NavItem link="/">
				<span class="title">Home</span>
			</NavItem>
			<NavItem>
				<span class="title">Forms</span>
			</NavItem>
			<NavItem link="/examples/button">
				<span class="link">Button</span>
			</NavItem>
			<NavItem link="/examples/input">
				<span class="link">Input</span>
			</NavItem>
			<NavItem link="/examples/switch">
				<span class="link">Switch</span>
			</NavItem>
			<NavItem link="/examples/parser">
				<span class="link">Parser</span>
			</NavItem>
			<NavItem link="/examples/select">
				<span class="link">Select</span>
			</NavItem>
			<NavItem link="/examples/hoverTooltip">
				<span class="link">Hover Tooltip</span>
			</NavItem>
			<NavItem link="/examples/auto-abi-form">
				<span class="link">Auto ABI Form</span>
			</NavItem>
			<NavItem link="/examples/jazzicon">
				<span class="link">Jazzicon</span>
			</NavItem>
			<NavItem link="/examples/display-address">
				<span class="link">Display Address</span>
			</NavItem>
			<NavItem link="/examples/progress-bar">
				<span class="link">Progress Bar</span>
			</NavItem>
			<NavItem link="/examples/tabs">
				<span class="link">Tabs</span>
			</NavItem>
			<NavItem link="/examples/section">
				<span class="link">Section</span>
			</NavItem>
			<NavItem link="/examples/pills">
				<span class="link">Pills</span>
			</NavItem>
			<NavItem link="/examples/filter">
				<span class="link">Filter</span>
			</NavItem>
		</div>
		<div class="p-8 w-full overflow-auto">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-gray-800 dark:text-gray-100 font-semibold;
	}
	.link {
		@apply text-gray-600 dark:text-gray-400;
	}
</style>
