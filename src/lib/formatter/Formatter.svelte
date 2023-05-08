<script context="module" lang="ts">
	import { rld, type ExpressionConfig } from '@rainprotocol/rainlang';

	export const getRawExpression = async (config_: ExpressionConfig) => {
		return (await rld(config__)).getTextDocument().getText();
	};
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import { DocumentDuplicate } from '@steeze-ui/heroicons';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let readOnly: boolean = true;
	export let raw: string = '';
	export let expressionConfig: Writable<ExpressionConfig>;
	export let showFork: boolean = true;
	export let showForkLabel: boolean = false;
	export let maxHeight: string | null = null;

	let parserInput: ParserInput;

	let showFormatter: boolean = true;

	const dispatch = createEventDispatcher();

	onMount(async () => {
		// TODO: Don't skip raw formatting (avoid compiling and decompiling? loss of information)
		// if (raw)
		// 	return (raw = (await rld(await rlc(raw, opMeta), opMeta, true)).getTextDocument().getText());

		if (raw) return;
		else if (expressionConfig) {
			raw = await getRawExpression($expressionConfig);
			return;
		} else showFormatter = false;
	});

	const handleFork = () => {
		dispatch('fork');
	};
</script>

{#if showFormatter}
	<div class="bg-gray-100 dark:bg-gray-800 rounded-lg relative">
		<div class="overflow-y-scroll p-4" style={maxHeight ? `max-height: ${maxHeight}` : ''}>
			<ParserInput {raw} {readOnly} bind:this={parserInput} />
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
