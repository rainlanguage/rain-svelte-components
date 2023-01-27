<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/heroicons/types';

	export let variant = 'default';
	export let disabled = false;
	export let size = 'regular';
	export let icon: IconSource | undefined = undefined;
	export let solidIcon: boolean = false;
	export let classes: string = '';
	export let dual: 'right' | 'left' | null = null;
	export let type: string | null = null;

	let iconStyle: string;

	$: variantCalc = disabled ? 'disabled' : variant;

	const iconOnly = icon && $$slots.default == undefined;

	if (size === 'small' && iconOnly) size = 'small-icon-only';

	if (size === 'small') {
		iconStyle = `w-5 h-5 py-0.5 ${iconOnly ? '' : 'mr-1.5'}`;
	} else {
		// Always setting a good value
		// size = 'regular';
		iconStyle = `w-6 h-6 py-0.5 ${iconOnly ? '' : 'mr-1.5'}`;
	}

	if (variant === 'transparent') {
		iconStyle += ' text-black';
	}
</script>

<button
	{disabled}
	on:click
	{type}
	class={`button ${variantCalc} ${size} ${classes} ${dual ?? 'rounded-[10px]'} ${
		icon ? 'withIcon' : ''
	}`}
>
	{#if icon != undefined}
		<Icon src={icon} class={iconStyle} theme={solidIcon ? 'solid' : ''} />
	{/if}
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply leading-none transition-colors text-white;
	}

	.right {
		@apply rounded-r-[10px];
	}
	.left {
		@apply rounded-l-[10px];
	}

	.withIcon {
		@apply flex;
	}

	.icon {
		@apply w-6 h-6;
	}

	.small {
		@apply px-2.5 py-[5px] text-sm;
	}

	.small-icon-only {
		@apply h-8 w-8 flex items-center justify-center rounded-md;
	}
	.regular {
		@apply px-5 py-2.5 text-base;
	}

	.default {
		@apply bg-gray-900 hover:bg-gray-800;
	}
	.primary {
		@apply bg-blue-700 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-200;
	}

	.secondary {
		@apply bg-blue-500 hover:bg-blue-400;
	}

	.black {
		@apply bg-neutral-900 hover:bg-neutral-800;
	}

	.transparent {
		@apply text-neutral-600 border border-neutral-200 hover:bg-neutral-100;
	}

	.disabled {
		@apply cursor-not-allowed bg-gray-400;
	}

	.rain-primary {
		@apply bg-rainprimary;
	}

	.rain-secondary {
		@apply bg-rainsecondary;
	}
</style>
