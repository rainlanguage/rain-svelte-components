<script context="module" lang="ts">
	import type { AbiParameter } from 'abitype';
	export type MethodMeta = AbiParameter & { inputs: any[]; expressions: any[] };
	export type AbiComponet = AbiParameter & {
		nameMeta?: string;
		descriptionMeta?: string;
		isInterpreterField?: boolean;
		isDeployerField?: boolean;
	};
</script>

<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import { setContext } from 'svelte';

	export let result: any = [];
	export let components: AbiComponet[] = [];

	export let onlyExpressions = false;
	export let onlyConfig = false;
	export let showInterpreterFields = false;

	if (onlyExpressions) {
		// To only show the column to write expressions
		setContext('onlyExpressionParser', true);
	}

	setContext('abi-form', {
		onlyExpressions,
		onlyConfig,
		showInterpreterFields
	});
</script>

{#if components}
	<div class="flex flex-col gap-y-4">
		{#each components as component, i}
			<AutoAbiFormComponent {component} bind:result={result[i]} on:save on:load on:expand on:help />
		{/each}
	</div>
{/if}
