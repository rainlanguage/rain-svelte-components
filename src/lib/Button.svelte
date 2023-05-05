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
	export let type: 'button' | 'submit' | 'reset' | null | undefined = null;
	export let iconPosition: 'right' | 'left' = 'left';
	export let iconStyle: string = '';

	const iconOnly = icon && $$slots.default == undefined;

	if (size === 'small' && iconOnly) size = 'small-icon-only';

	// If no iconStyle provided, then use defaults
	if (iconStyle == '') {
		iconStyle =
			size === 'small'
				? `w-5 h-5 py-0.5 ${iconOnly ? '' : 'mr-1.5'}`
				: `w-6 h-6 py-0.5 ${iconOnly ? '' : 'mr-1.5'}`;
	}

	if (variant === 'transparent') {
		iconStyle += ' text-black';
	}

	if (classes !== '') {
		variant = classes;
	}

	$: variantCalc = disabled ? 'disabled' : variant;
</script>

<button
	{disabled}
	on:click
	type={type ?? 'button'}
	class={` ${variantCalc} ${size} ${classes} ${dual ?? 'rounded-[10px]'} ${icon ? 'withIcon' : ''}`}
>
	{#if iconPosition == 'left' && icon != undefined}
		<Icon src={icon} class={iconStyle} theme={solidIcon ? 'solid' : ''} />
	{/if}
	<slot />
	{#if iconPosition == 'right' && icon != undefined}
		<Icon src={icon} class={iconStyle} theme={solidIcon ? 'solid' : ''} />
	{/if}
</button>

<style lang="postcss">
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
		@apply px-2.5 py-[5px] text-sm flex items-center justify-center;
	}

	.small-icon-only {
		@apply h-8 w-8 flex items-center justify-center;
	}
	.regular {
		@apply px-5 py-2.5 text-base;
	}

	.default {
		@apply bg-gray-900 hover:bg-gray-800 text-white;
	}
	.primary {
		@apply bg-blue-700 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-200 text-white;
	}

	.secondary {
		@apply bg-blue-500 hover:bg-blue-400 text-white;
	}

	.black {
		@apply bg-neutral-900 hover:bg-neutral-800 text-white;
	}

	.transparent {
		@apply text-neutral-600 border border-neutral-200 hover:bg-neutral-100;
	}

	.disabled {
		@apply cursor-not-allowed bg-gray-400 text-white;
	}

	.rain-primary {
		@apply bg-rainprimary text-white;
	}

	.rain-secondary {
		@apply bg-rainsecondary text-white;
	}
</style>
