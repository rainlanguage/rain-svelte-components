<script lang="ts">
	import { parseInt, set } from 'lodash-es';
	import type { Abi, AbiParameter } from 'abitype';
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import { setContext } from 'svelte';

	type MethodMeta = AbiParameter & { inputs: any[]; expressions: any[] };
	type AbiComponet = AbiParameter & {
		nameMeta?: string;
		descriptionMeta?: string;
		isInterpreterField?: boolean;
		isDeployerField?: boolean;
	};

	export let contractMeta: any;
	export let abi: Abi;
	export let result: any = [];

	export let onlyExpressions = false;
	export let onlyConfig = false;
	export let showInterpreterFields = false;

	let errorMeta: boolean;
	let errorMetaMsg: string;

	setContext('abi-form', {
		onlyExpressions,
		onlyConfig,
		showInterpreterFields
	});

	const findConfigs = (abi_: Abi, contractMeta_: any): AbiComponet[] => {
		let paths: string[] = [];
		let mainIndex: number;
		let entriesIndex: number[];

		// Fill the abi with the meta information.
		if (contractMeta_ && contractMeta_.methods) {
			contractMeta_.methods.forEach((method: any) => {
				if (method.expressions) {
					method.expressions.forEach((expression: any) => {
						set(abi_, expression.path + '.nameMeta', expression.name);
						set(abi_, expression.path + '.descriptionMeta', expression.desc);
					});
				}
				if (method.inputs) {
					method.inputs.forEach((input: any) => {
						set(abi_, input.path + '.nameMeta', input.name);
						set(abi_, input.path + '.descriptionMeta', input.desc);
					});
				}
			});
		}

		let initializeMethod = (contractMeta_.methods as MethodMeta[]).find(
			(method_: any) => method_.name == 'initialize'
		);
		if (initializeMethod) {
			initializeMethod.inputs.forEach((input_: any) => paths.push(input_.path));
			initializeMethod.expressions.forEach((input_: any) => paths.push(input_.path));
		}

		// Assuming that all the paths shared the same index on the ABI. Otherwise,
		// the config on the metadata should be wrong.
		// The code is trying to catch cases were the contract meta is wrong. Try to
		// maintin the TS typing.
		const mainIndexMatch = paths?.[0].match(/\[(\d+)]/)?.[1];

		// This way to avoid iterating multiple times.
		let inputsMatch: string[] = [];
		paths.forEach((path) => {
			const v = path.match(/inputs\[(\d+)\]/)?.[1];
			if (v) inputsMatch.push(v);
		});

		if (!mainIndexMatch || !inputsMatch.length) {
			errorMeta = true;
			errorMetaMsg = 'It cannot find the configuration to clone the contract.';
			return [];
		}

		mainIndex = parseInt(mainIndexMatch, 10);
		entriesIndex = [...new Set(inputsMatch.map((inputI_) => parseInt(inputI_, 10)))];

		const posiAbi = abi_[mainIndex] as MethodMeta;

		// Saving config
		return posiAbi.inputs.filter((_, i_) => entriesIndex.includes(i_));
		// configComponents = posiAbi.inputs.filter((_, i_) => entriesIndex.includes(i_));
	};

	let configComponents: AbiComponet[] = findConfigs(abi, contractMeta);
</script>

{#if contractMeta || !contractMeta}
	{#if configComponents}
		<div class="flex flex-col gap-y-4">
			{#each configComponents as component, i}
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
