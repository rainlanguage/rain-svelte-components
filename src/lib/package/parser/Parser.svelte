<script lang="ts">
	import SimulatedOutput from '$lib/package/parser/SimulatedOutput.svelte';
	import type { Signer } from 'ethers';
	import type { StateConfig } from 'rain-sdk';
	import { writable, type Writable } from 'svelte/store';
	import ParserInput from './ParserInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { QuestionMarkCircle, ArrowsPointingOut } from '@steeze-ui/heroicons';

	export let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
	export let signer: Signer;
	export let error: string = '';
</script>

<div class="rounded-lg overflow-hidden">
	<div class="flex bg-gray-100">
		<div class="flex flex-col w-2/3">
			<div class="heading">Expression</div>
			<div class="border-r border-gray-300 parser-wrapper flex flex-col">
				<ParserInput {vmStateConfig} bind:error />
			</div>
		</div>
		<div class="flex flex-col w-1/3">
			<div class="heading">Simulated output</div>
			<div class="p-2">
				<SimulatedOutput {vmStateConfig} {signer} />
			</div>
		</div>
	</div>
	<div class="bg-gray-200 p-2 flex justify-between">
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
			<div class="parser-button">
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
		@apply flex items-center gap-x-1 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors;
	}
</style>
