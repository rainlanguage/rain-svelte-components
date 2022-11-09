<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let name = 'Default';

	let open = false;

	const openGroup = () => {
		open = !open;
	};
</script>

<div
	use:autoAnimate
	class="w-full flex flex-col border-b border-gray-200 dark:border-gray-600 py-4"
>
	<div on:click={openGroup} class="flex flex-row justify-between w-full cursor-pointer">
		<span class="font-medium">{name}</span>
		<span class="w-4 text-gray-900 transition-transform dark:text-white" class:open>
			<Icon src={ChevronDown} />
		</span>
	</div>
	{#if open}
		<div class="mt-4">
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.open {
		@apply rotate-180;
	}
</style>
