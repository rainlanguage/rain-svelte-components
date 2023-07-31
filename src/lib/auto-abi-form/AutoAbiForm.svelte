<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	// import type { ContractMetadata } from 'rain-metadata/type-definitions/contract';
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
	export let metadata: any;

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
				<div class:onlyConfig class:normalForm={!onlyConfig} class="container">
					<AutoAbiFormComponent
						{component}
						bind:result={result[i]}
						on:save
						on:load
						on:expand
						on:help
					/>
				</div>
			{/each}
		</div>
	{/if}
{:else}
	Invalid contract metadata
{/if}

<style lang="postcss">
	.onlyConfig {
		@apply gap-y-4 flex flex-col;
	}

	.normalForm {
		@apply flex flex-col gap-y-4;
	}

	.container {
		@apply border-b border-gray-300 pb-4 w-full last:border-0 last:py-0;
	}
</style>
