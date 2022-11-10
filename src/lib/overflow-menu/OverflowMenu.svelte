<script lang="ts">
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { EllipsisVertical } from '@steeze-ui/heroicons';

	let open: boolean;
	let buttonRef: HTMLDivElement;
	let menuRef: HTMLDivElement;

	const toggle = () => {
		open = !open;
	};

	setContext('overflow-menu', {
		toggle
	});
</script>

<svelte:window
	on:click={({ target }) => {
		if (target) {
			if (buttonRef && buttonRef.contains(target)) return;
			if (menuRef && !menuRef.contains(target)) {
				toggle();
			}
		}
	}}
/>

<div class="relative inline-flex">
	<div class:noButton={!$$slots.button} on:click={toggle} bind:this={buttonRef}>
		{#if !$$slots.button}
			<span class="w-6">
				<Icon src={EllipsisVertical} />
			</span>
		{:else}
			<slot name="button" />
		{/if}
	</div>
	{#if open}
		<div
			transition:fade={{ duration: 70 }}
			bind:this={menuRef}
			class="absolute top-full left-0 z-10 mt-1 flex flex-col items-stretch overflow-hidden rounded-md border border-gray-100 bg-white p-2 w-48 filter shadow-md dark:bg-gray-900 dark:border-gray-800"
		>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.noButton) {
		@apply flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors dark:hover:bg-gray-800 hover:bg-gray-100 border border-gray-200 dark:border-gray-700;
	}
</style>
