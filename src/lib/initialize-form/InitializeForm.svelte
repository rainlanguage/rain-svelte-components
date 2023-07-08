<script context="module" lang="ts">
	import { parseInt, set } from 'lodash-es';
	import { ethers } from 'ethers';
	import type { MethodMeta } from './FormComponent.svelte';

	export const findConfigs = (
		abi_: Abi,
		contractMeta_: any,
		handleError_?: Function
	): AbiComponet[] => {
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
		const mainIndexMatch = paths[0]?.match(/\[(\d+)]/)?.[1];

		// This way to avoid iterating multiple times.
		let inputsMatch: string[] = [];
		paths.forEach((path) => {
			const v = path.match(/inputs\[(\d+)\]/)?.[1];
			if (v) inputsMatch.push(v);
		});

		if (!mainIndexMatch || !inputsMatch.length) {
			if (handleError_) handleError_();
			return [];
		}

		mainIndex = parseInt(mainIndexMatch, 10);
		entriesIndex = [...new Set(inputsMatch.map((inputI_) => parseInt(inputI_, 10)))];

		const positionAbi = abi_[mainIndex] as MethodMeta;

		// Saving config
		return positionAbi.inputs.filter((_, i_) => entriesIndex.includes(i_));
	};

	export const encodeConfigs = (values_: any, abi_: any, contractMeta_: any): string | null => {
		const abiCoder = ethers.utils.defaultAbiCoder;
		const configs = findConfigs(abi_, contractMeta_);

		try {
			// @ts-expect-error Here the type is wrongly showing error, because the configs
			// have all the fields required.
			return abiCoder.encode(configs, values_);
		} catch (error) {
			console.log('It cannot encode the values');
			return null;
		}
	};
</script>

<script lang="ts">
	import { merge } from 'lodash-es';
	import FormComponent, { type AbiComponet } from './FormComponent.svelte';
	import { Section, SectionBody, SectionHeading } from '$lib/section';

	import type { Abi } from 'abitype';

	export let contractMeta: any;
	export let abi: Abi;
	export let result: any = [];
	// Flag to allow the consumer to handle when the ABI and/or contract meta does
	// not provide information for initializable/clonable process.
	export let isInitializable: boolean;

	let expressionsResult: any, configResult: any;
	let components: AbiComponet[] = findConfigs(abi, contractMeta);

	$: result = merge([], configResult, expressionsResult);
	$: components, components.length == 0 ? (isInitializable = false) : (isInitializable = true);
</script>

<div class="flex flex-col gap-y-8">
	{#if components && components.length}
		<Section>
			<SectionHeading>Expressions</SectionHeading>
			<SectionBody>
				<FormComponent {components} bind:result={expressionsResult} onlyExpressions />
			</SectionBody>
		</Section>
		<Section>
			<SectionHeading>Configuration</SectionHeading>
			<SectionBody>
				<FormComponent {components} bind:result={configResult} onlyConfig />
			</SectionBody>
		</Section>
	{/if}
</div>
