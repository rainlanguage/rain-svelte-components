<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import type { ContractMetadata } from 'rain-metadata/metadata-types/contract';
	// import * as Ajv from 'ajv';
	import { set } from 'lodash-es';
	import type { Abi } from 'abitype';
	import { createEventDispatcher, setContext } from 'svelte';

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
	let valid: boolean = true;

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;

	if (metadata) {
		if (metadata.expressions) {
			metadata.expressions.forEach((expression) => {
				set(abi, expression.path + '.nameMeta', expression.name);
				set(abi, expression.path + '.descriptionMeta', expression.description);
			});
		}
		if (metadata.inputs) {
			metadata.inputs.forEach((input) => {
				set(abi, input.path + '.nameMeta', input.name);
				set(abi, input.path + '.descriptionMeta', input.description);
			});
		}
		if (metadata.interpreterFields) {
			set(abi, metadata.interpreterFields.interpreterFieldPath + '.isInterpreterField', true);
			set(abi, metadata.interpreterFields.deployerFieldPath + '.isDeployerField', true);
		}
	}
</script>

{#if (metadata && valid) || !metadata}
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
