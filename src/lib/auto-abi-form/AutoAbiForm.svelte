<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import type { ContractMetadata } from 'rain-metadata/type-definitions/contract';
	import { set } from 'lodash-es';
	import type { Abi } from 'abitype';
	import { setContext } from 'svelte';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = [];

	// config - moved into context so it's available to every component
	export let onlyExpressions: boolean = false;
	export let onlyConfig: boolean = false;
	export let showInterpreterFields: boolean = true;

	setContext('abi-form', { onlyExpressions, onlyConfig, showInterpreterFields });

	// metadata
	export let metadata: ContractMetadata;

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;

	if (metadata && metadata.methods) {
		metadata.methods.forEach((method) => {
			if (method.expressions) {
				method.expressions.forEach((expression) => {
					set(abi, expression.path + '.nameMeta', expression.name);
					set(abi, expression.path + '.descriptionMeta', expression.desc);
				});
			}
			if (method.inputs) {
				method.inputs.forEach((input) => {
					set(abi, input.path + '.nameMeta', input.name);
					set(abi, input.path + '.descriptionMeta', input.desc);
				});
			}
		});
	}
</script>

{#if metadata || !metadata}
	{#if inputs}
		<div class:onlyConfig class:normalForm={!onlyConfig}>
			{#each inputs as component, i}
				<AutoAbiFormComponent
					{component}
					bind:result={result[i]}
					on:save
					on:load
					on:expand
					on:help
				/>
			{/each}
		</div>
	{/if}
{:else}
	Invalid contract metadata
{/if}

<style>
	.onlyConfig {
		@apply gap-y-4 grid grid-cols-2 items-end gap-4;
	}

	.normalForm {
		@apply flex flex-col gap-y-4;
	}
</style>
