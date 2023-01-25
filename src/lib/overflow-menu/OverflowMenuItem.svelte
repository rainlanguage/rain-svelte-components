<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';
	import { createEventDispatcher, getContext } from 'svelte';

	export let icon: IconSource;
	export let classes: string = '';
	export let href: string | null = null;
	export let target: string | null = null;

	let el: 'button' | 'a';

	$: el = href ? 'a' : 'button';

	const { toggle } = getContext('overflow-menu') as { toggle: Function };
	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click');
		toggle();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={el}
	class={`defaultClasses ${classes}`}
	on:click={handleClick}
	{href}
	{target}
>
	{#if icon}
		<span class="w-4 mr-2">
			<Icon src={icon} />
		</span>
	{/if}
	<span>
		<slot />
	</span>
</svelte:element>

<style lang="postcss" global>
	:local(.defaultClasses) {
		@apply flex items-center cursor-pointer py-1 px-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap rounded-md;
	}
</style>
