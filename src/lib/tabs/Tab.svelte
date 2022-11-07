<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let href: string;

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS) as any;

	registerTab(tab);
</script>

<a
	class={`tab ${
		$selectedTab === tab ? 'selected dark:text-white dark:border-white dark:hover:border-white' : ''
	}`}
	class:selected={$selectedTab === tab}
	on:click={() => selectTab(tab)}
	href={href || null}
>
	<slot />
</a>
<div class="w-5 px-0" />

<style lang="postcss">
	.tab {
		@apply cursor-pointer pb-2 px-3 font-sans tracking-tight text-gray-500 hover:border-gray-400 hover:border-b;
	}

	.selected {
		@apply border-b text-black border-black hover:border-black;
	}
</style>
