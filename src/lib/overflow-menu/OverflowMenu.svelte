<script lang="ts">
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { EllipsisVertical } from '@steeze-ui/heroicons';

	export let position: 'left' | 'right' = 'left';
	export let onHover: boolean = false;

	let open: boolean;
	let buttonRef: HTMLDivElement;
	let menuRef: HTMLDivElement;

	const toggle = () => {
		open = !open;
	};

	const handleClick = () => {
		if (!onHover) {
			toggle();
		}
	};

	const handleHover = () => {
		if (onHover) {
			toggle();
		}
	};

	setContext('overflow-menu', {
		toggle
	});

	console.log(position);
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

<div on:mouseenter={handleHover} on:mouseleave={handleHover} class="relative inline-flex">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class:noButton={!$$slots.button} on:click={handleClick} bind:this={buttonRef}>
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
			class={`
			${position == 'left' ? 'left-0' : 'right-0'} 
			absolute top-full z-10 pt-1
			`}
		>
			<div
				class="flex flex-col items-stretch overflow-hidden rounded-md border border-gray-100 bg-white p-2 w-48 filter shadow-md dark:bg-gray-900 dark:border-gray-800"
			>
				<slot />
			</div>
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.noButton) {
		@apply flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors dark:hover:bg-gray-800 hover:bg-gray-100 border border-gray-200 dark:border-gray-700;
	}
</style>
