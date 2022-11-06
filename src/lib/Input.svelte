<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/heroicons/types';

	import Ring from './Ring.svelte';

	export let type: 'text' | 'number' | 'range' | 'datetime-local' | 'textarea' = 'text';
	export let value: string | number = '';
	export let placeholder = '';
	export let debounce: boolean = false;
	export let debounceTime: number = 750;
	export let min = '';
	export let max = '';
	export let disabled = false;

	export let icon: IconSource | undefined = undefined;

	export let validator = async (value: any): Promise<any> => null;

	let error: string | null;

	let timer: NodeJS.Timeout, validating: boolean;

	$: borderColor = error ? 'border-red-500' : 'border-gray-500';


	const dispatch = createEventDispatcher();

	const handleInput = (e: any) => {
		const v = e.target.value;
		if (debounce) {
			doDebounce(v);
		} else {
			value = v;
			dispatch('input', v);
		}
	};

	const handleBlur = (e: any) => {
		validate();
		dispatch('blur', e);
	};

	const doDebounce = (v: number) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			value = v;
			dispatch('input', v);
		}, debounceTime);
	};

	export const validate = async () => {
		validating = true;
		const validation = await validator(value);
		validating = false;
		if (validation?.error) {
			({ error } = validation);
			return {
				ok: false
			};
		} else {
			error = null;
			return {
				ok: true,
				value
			};
		}
	};
</script>

<div use:autoAnimate class="flex w-full flex-col gap-y-2">
	{#if $$slots.label}
		<div class=" text-gray-800 dark:text-gray-200 text-sm font-medium">
			<slot name="label" />
		</div>
	{/if}
	{#if $$slots.description}
		<span class="text-gray-600 dark:text-gray-400 text-sm">
			<slot name="description" />
		</span>
	{/if}
	<div class="flex w-full flex-row items-center gap-x-2 self-stretch relative">
		{#if icon != undefined}
			<Icon src={icon} class="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 opacity-50"/>
		{/if}
		<input
			{type}
			{value}
			{placeholder}
			on:input={handleInput}
			on:blur={handleBlur}
			{disabled}
			{min}
			{max}
			class={`w-full rounded-md bg-gray-200 dark:bg-gray-800 p-2 font-light ${borderColor} dark:text-gray-100  ${icon ? "pl-12" : ""}`}
			class:disabled
		/>

		{#if validating}
			<div class="absolute right-1 top-0 bottom-0 flex flex-col justify-center">
				<Ring size="30px" color="#000" />
			</div>
		{/if}
	</div>
	{#if error}
		<span class="text-red-500">{error}</span>
	{/if}
</div>

<style lang="postcss">
	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
