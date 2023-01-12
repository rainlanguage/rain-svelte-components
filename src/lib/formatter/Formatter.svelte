<script lang="ts">
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Formatter, rainterpreterOpMeta, type StateConfig } from '@rainprotocol/rainlang';
	import Button from '$lib/Button.svelte';
	import { DocumentDuplicate } from '@steeze-ui/heroicons';

	export let readOnly: boolean = true;
	export let raw: string | null = null;
	export let stateConfig: StateConfig | null = null;
	export let showFork: boolean = true;
	export let maxHeight: string | null = null;

	let formatter: ParserInput;

	let showFormatter: boolean = true;

	const dispatch = createEventDispatcher();

	onMount(() => {
		if (stateConfig) raw = Formatter.get(stateConfig, { opmeta: rainterpreterOpMeta });
		if (raw) formatter.loadRaw(raw.toLowerCase());
		if (!raw && !stateConfig) showFormatter = false;
	});

	const handleFork = () => {
		dispatch('fork');
	};
</script>

{#if showFormatter}
	<div class="bg-gray-100 dark:bg-gray-800 rounded-lg relative">
		<div class="overflow-y-scroll p-4" style={maxHeight ? `max-height: ${maxHeight}` : ''}>
			<ParserInput {readOnly} bind:this={formatter} />
		</div>
		{#if showFork}
			<div class="bottom-0 right-0 p-2 absolute bg-gray-100 dark:bg-gray-800">
				<Button icon={DocumentDuplicate} on:click={handleFork} size="small">Fork</Button>
			</div>
		{/if}
	</div>
{/if}
