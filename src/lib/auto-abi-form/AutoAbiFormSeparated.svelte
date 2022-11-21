<script lang="ts">
	import AutoAbiForm from '$lib/auto-abi-form/AutoAbiForm.svelte';
	import type { ContractMetadata } from 'rain-metadata/metadata-types/contract';
	import { Section, SectionBody, SectionHeading } from '$lib/section';
	import type { Abi, AbiFunction, AbiParameter } from 'abitype';
	import { merge } from 'lodash-es';
	import { createEventDispatcher } from 'svelte';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = [];
	export let metadata: ContractMetadata;

	let expressionsResult: any, configResult: any;

	const hasExpressions = (abi: Abi): boolean => {
		let expressions: boolean = false;
		const findExpression = (component: AbiParameter) => {
			if ('internalType' in component) {
				if (
					component.internalType == 'struct StateConfig' ||
					component.internalType == 'struct StateConfig[]'
				) {
					expressions = true;
				}
			}
			if ('components' in component) {
				component.components.forEach(findExpression);
			}
		};
		abi.forEach((e) => {
			if ('inputs' in e && 'name' in e && e.name == methodName) e.inputs?.forEach(findExpression);
		});
		return expressions;
	};

	$: expressions = hasExpressions(abi);

	$: result = merge([], expressionsResult, configResult);
</script>

<div class="flex flex-col gap-y-8">
	{#if expressions}
		<Section>
			<SectionHeading>Expressions</SectionHeading>
			<SectionBody>
				<AutoAbiForm
					{abi}
					{methodName}
					bind:result={expressionsResult}
					{metadata}
					onlyExpressions
					on:save
					on:load
				/>
			</SectionBody>
		</Section>
	{/if}
	<Section>
		<SectionHeading>Configuration</SectionHeading>
		<SectionBody>
			<AutoAbiForm {abi} {methodName} bind:result={configResult} {metadata} onlyConfig />
		</SectionBody>
	</Section>
</div>
