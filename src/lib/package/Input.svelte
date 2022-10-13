<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { createEventDispatcher } from 'svelte';
	import Ring from './Ring.svelte';

	export let type: 'text' | 'number' | 'range' | 'address' | 'datetime-local' | 'textarea' = 'text';
	export let value: string | number = '';
	export let placeholder = '';
	export let validator = async (value: any): Promise<any> => null;
	export let debounce: boolean = false;
	export let debounceTime: number = 750;
	export let min = '';
	export let max = '';
	export let disabled = false;
	export let errorMsg = '';

	let error: string | null;
	let timer: NodeJS.Timeout, validating: boolean;

	$: _type = type == 'address' ? 'text' : type;

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
	<div class="flex w-full flex-row items-center gap-x-2 self-stretch">
		<input
			type={_type}
			{value}
			{placeholder}
			on:input={handleInput}
			on:blur={() => {
				validate();
			}}
			{disabled}
			{min}
			{max}
			class="w-full rounded-md bg-gray-200 dark:bg-gray-800 p-2 font-light {borderColor} dark:text-gray-100"
		/>
		{#if validating}
			<div
				class="absolute right-1 top-0 bottom-0 flex flex-col justify-center"
				class:push-loader={type == 'address'}
			>
				<Ring size="30px" color="#FFF" />
			</div>
		{/if}
	</div>
	{#if error}
		<span class="text-red-500">{error}</span>
	{/if}
	{#if errorMsg && errorMsg !== ''}
		<span class="text-red-500">{errorMsg}</span>
	{/if}
</div>
