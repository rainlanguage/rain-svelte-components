<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import ContractMeta from '$lib/auto-abi-form/schemas/contract.json';
	import type { ContractMetadata } from '$lib/auto-abi-form/schemas/contract';
	import Ajv from 'ajv';
	import { set } from 'lodash';
	import type { Abi } from 'abitype';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = [];

	// metadata
	export let metadata: ContractMetadata;
	let valid: boolean;

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;

	if (metadata) {
		const ajv = new Ajv();
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
		<div class="flex flex-col gap-y-4">
			{#each inputs as component, i}
				<AutoAbiFormComponent {component} bind:result={result[i]} />
			{/each}
		</div>
	{/if}
{:else}
	Invalid contract metadata
{/if}
