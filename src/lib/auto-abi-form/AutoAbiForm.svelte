<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import ContractMeta from '$lib/auto-abi-form/schemas/contract.json';
	import type { ContractMetadata } from '$lib/auto-abi-form/schemas/contract';
	import * as Ajv from 'ajv';
	import { set } from 'lodash';
	import type { Abi } from 'abitype';
	import { setContext } from 'svelte';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = [];
	export let onlyExpressions = false;
	export let onlyConfig = false;

	setContext('abi-form', { onlyExpressions, onlyConfig });

	// metadata
	export let metadata: ContractMetadata;
	let valid: boolean;

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;

	if (metadata) {
		const ajv = new Ajv.default();
		const validate = ajv.compile(ContractMeta);

		valid = validate(metadata);

		if (!valid) {
			console.log(validate.errors);
		} else {
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
		}
	}
</script>

{#if (metadata && valid) || !metadata}
	{#if inputs}
		<div class:onlyConfig class:normalForm={!onlyConfig}>
			{#each inputs as component, i}
				<AutoAbiFormComponent {component} bind:result={result[i]} />
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
