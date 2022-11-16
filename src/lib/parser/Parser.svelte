<svelte:options accessors={true} />

<script lang="ts">
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import type { Signer } from 'ethers';
	import type { StateConfig } from 'rain-sdk';
	import { writable, type Writable } from 'svelte/store';
	import ParserInput from './ParserInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		QuestionMarkCircle,
		ArrowsPointingOut,
		CloudArrowUp,
		CloudArrowDown
	} from '@steeze-ui/heroicons';
	import { createEventDispatcher, onMount, SvelteComponent } from 'svelte';

	export let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
	export let raw: string = '';
	export let signer: Signer;
	export let error: string = '';

	let parserInput: SvelteComponent;

	export let loadRaw: any = null;

	onMount(() => {
		loadRaw = parserInput.loadRaw;
	});

	const dispatch = createEventDispatcher();

	const save = () => {
		dispatch('save', { raw });
	};

	const load = () => {
		dispatch('load');
	};
</script>

<div class="rounded-lg overflow-hidden">
	<div class="flex bg-gray-100 dark:bg-gray-700">
		<div class="flex flex-col w-2/3">
			<div class="heading">Expression</div>
			<div class="border-r border-gray-300 dark:border-gray-600 p-2 parser-wrapper flex flex-col">
				<ParserInput {vmStateConfig} bind:error bind:raw bind:this={parserInput} />
			</div>
		</div>
		<div class="flex flex-col w-1/3">
			<div class="heading">Simulated output</div>
			<div class="p-2">
				<SimulatedOutput {vmStateConfig} {signer} />
			</div>
		</div>
	</div>
	<div class="bg-gray-200 dark:bg-gray-800 p-2 flex justify-between">
		<div class="text-red-500 text-xs font-regular h-4">
			{#if error}
				Error: {error}
			{/if}
		</div>
		<div class="gap-x-3 flex items-center">
			<div class="parser-button">
				<span class="text-xs">Help</span>
				<span class="w-4">
					<Icon src={QuestionMarkCircle} />
				</span>
			</div>
			<div on:click={load} class="parser-button">
				<span class="text-xs">Load</span>
				<span class="w-4">
					<Icon src={CloudArrowDown} />
				</span>
			</div>
			<div on:click={save} class="parser-button">
				<span class="text-xs">Save</span>
				<span class="w-4">
					<Icon src={CloudArrowUp} />
				</span>
			</div>
			<div class="parser-button ">
				<span class="text-xs">Expand</span>
				<span class="w-4">
					<Icon src={ArrowsPointingOut} />
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.heading {
		@apply bg-gray-500 text-white font-light uppercase py-2 px-2 leading-none;
		font-size: 11px;
	}
	.parser-wrapper {
		min-height: 150px;
	}

	.parser-button {
		@apply flex items-center gap-x-1 cursor-pointer hover:opacity-80 transition-opacity;
	}
</style>
