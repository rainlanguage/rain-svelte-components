<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import { rld, type ExpressionConfig } from '@rainprotocol/rainlang';
	import { DocumentDuplicate } from '@steeze-ui/heroicons';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let readOnly: boolean = true;
	export let raw: string = '';
	export let expressionConfig: Writable<ExpressionConfig>;
	export let showFork: boolean = true;
	export let showForkLabel: boolean = false;
	export let maxHeight: string | null = null;
	export let opMeta: string;

	let parserInput: ParserInput;

	let showFormatter: boolean = true;

	const dispatch = createEventDispatcher();

	onMount(async () => {
		// TODO: Formatting without compiling and decompiling
		// if (raw)
		// 	return (raw = (await rld(await rlc(raw, opMeta), opMeta, true)).getTextDocument().getText());
		if (raw) return;

		if (expressionConfig)
			return (raw = (await rld($expressionConfig, opMeta, true)).getTextDocument().getText());

		if (!raw && !expressionConfig) showFormatter = false;
	});

	const handleFork = () => {
		dispatch('fork');
	};
</script>

{#if showFormatter}
	<div class="bg-gray-100 dark:bg-gray-800 rounded-lg relative">
		<div class="overflow-y-scroll p-4" style={maxHeight ? `max-height: ${maxHeight}` : ''}>
			<ParserInput {raw} {readOnly} {expressionConfig} bind:this={parserInput} {opMeta} />
		</div>
		{#if showFork}
			<div class="bottom-0 right-0 p-2 absolute bg-gray-100 dark:bg-gray-800">
				{#if showForkLabel}
					<Button icon={DocumentDuplicate} on:click={handleFork} size="small">Fork</Button>
				{:else}
					<Button icon={DocumentDuplicate} on:click={handleFork} size="small" />
				{/if}
			</div>
		{/if}
	</div>
{/if}
