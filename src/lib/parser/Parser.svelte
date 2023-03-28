<svelte:options accessors={true} />

<script lang="ts">
	import { darkMode } from '$lib/darkModeAction';
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import { getOpMetaFromSg, type ExpressionConfig } from '@rainprotocol/rainlang';
	import {
		ArrowsPointingOut,
		CloudArrowDown,
		CloudArrowUp,
		QuestionMarkCircle
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Signer } from 'ethers';
	import { createEventDispatcher, onMount, SvelteComponent } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import RainlangEditor from './RainlangEditor.svelte';

	export let expressionConfig: Writable<ExpressionConfig> = writable({
		sources: [],
		constants: []
	});
	export let raw: string = '';
	export let signer: Signer;
	export let error: string = '';
	export let readOnly: boolean = false;
	export let componentName: string | null = null;
	export let chainId: number = 80001;
	export let hideLoad: boolean = false;
	export let hideExpand: boolean = false;
	export let hideSave: boolean = false;
	export let hideHelp: boolean = false;

	let editorInput: SvelteComponent;

	export let loadRaw: any = null;

	const opMetaPromise = getOpMetaFromSg('0x01D5611c2D6FB7Bb1bFa9df2f524196743f59F2a', 524289);

	onMount(async () => {
		await opMetaPromise;
		loadRaw = editorInput.loadRaw;
	});

	const dispatch = createEventDispatcher();

	const save = () => {
		dispatch('save', { raw });
	};

	const load = () => {
		dispatch('load', { loadRaw, componentName });
	};

	const expand = () => {
		dispatch('expand', { loadRaw, raw, componentName });
	};

	const help = () => {
		dispatch('help');
	};
</script>

<div class="rounded-lg overflow-hidden h-full flex flex-col flex-grow">
	<div class="flex bg-gray-100 dark:bg-gray-700 flex-grow">
		<div class="flex flex-col w-2/3">
			<div class="heading">Expression</div>
			<div
				class="border-r border-gray-300 dark:border-gray-600 p-2 parser-wrapper flex-grow flex flex-col"
			>
				{#await opMetaPromise}
					<span>Fetching op meta...</span>
				{:then opmeta}
					<RainlangEditor
						{expressionConfig}
						{readOnly}
						bind:error
						bind:raw
						bind:this={editorInput}
						dark={$darkMode}
						minHeight="150px"
						opMeta={opmeta}
					/>
				{:catch e}
					<!-- promise was rejected -->
				{/await}
			</div>
		</div>
		<div class="flex flex-col w-1/3">
			<div class="heading">Simulated output</div>
			<div class="p-2">
				<SimulatedOutput {expressionConfig} {signer} {chainId} />
			</div>
		</div>
	</div>
	<div class="bg-gray-200 dark:bg-gray-800 flex justify-between px-2">
		<div class="text-red-500 text-xs font-regular h-4 p-2">
			{#if error}
				Error: {error}
			{/if}
		</div>
		<div class="gap-x-3 flex items-center text-gray-600">
			{#if !hideHelp}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={help} class="parser-button">
					<span class="text-xs">Help</span>
					<span class="w-4">
						<Icon src={QuestionMarkCircle} />
					</span>
				</div>
			{/if}
			{#if !hideLoad}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={load} class="parser-button">
					<span class="text-xs">Load</span>
					<span class="w-4">
						<Icon src={CloudArrowDown} />
					</span>
				</div>
			{/if}
			{#if !hideSave}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={save} class="parser-button">
					<span class="text-xs">Save</span>
					<span class="w-4">
						<Icon src={CloudArrowUp} />
					</span>
				</div>
			{/if}
			{#if !hideExpand}
				<div class="h-full border-l border-gray-300" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={expand} class="parser-button">
					<span class="text-xs">Detailed view</span>
					<span class="w-4">
						<Icon src={ArrowsPointingOut} />
					</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.heading {
		@apply bg-gray-500 text-white font-light uppercase py-2 px-2 leading-none;
		font-size: 11px;
	}

	.parser-button {
		@apply flex items-center gap-x-1 cursor-pointer hover:opacity-80 transition-opacity py-2;
	}
</style>
