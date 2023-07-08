<script context="module" lang="ts">
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
	import FormComponent, { findConfigs } from './FormComponent.svelte';
	import { Section, SectionBody, SectionHeading } from '$lib/section';

	import type { Abi } from 'abitype';
	import { ethers } from 'ethers';

	export let contractMeta: any;
	export let abi: Abi;
	export let result: any = [];

	let expressionsResult: any, configResult: any;

	$: result = merge([], configResult, expressionsResult);
</script>

<div class="flex flex-col gap-y-8">
	<Section>
		<SectionHeading>Expressions</SectionHeading>
		<SectionBody>
			<FormComponent {contractMeta} {abi} bind:result={expressionsResult} onlyExpressions />
		</SectionBody>
	</Section>
	<Section>
		<SectionHeading>Configuration</SectionHeading>
		<SectionBody>
			<FormComponent {contractMeta} {abi} bind:result={configResult} onlyConfig />
		</SectionBody>
	</Section>
</div>
