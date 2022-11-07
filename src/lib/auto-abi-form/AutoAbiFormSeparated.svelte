<script lang="ts">
	import AutoAbiForm from '$lib/auto-abi-form/AutoAbiForm.svelte';
	import type { ContractMetadata } from 'rain-metadata/metadata-types/contract';
	import { Section, SectionBody, SectionHeading } from '$lib/section';
	import type { Abi } from 'abitype';
	import { merge } from 'lodash-es';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = [];
	export let metadata: ContractMetadata;

	let expressionsResult: any, configResult: any;

	$: result = merge(expressionsResult, configResult);
</script>

<div class="flex flex-col gap-y-8">
	<Section>
		<SectionHeading>Expressions</SectionHeading>
		<SectionBody>
			<AutoAbiForm {abi} {methodName} bind:result={expressionsResult} {metadata} onlyExpressions />
		</SectionBody>
	</Section>
	<Section>
		<SectionHeading>Configuration</SectionHeading>
		<SectionBody>
			<AutoAbiForm {abi} {methodName} bind:result={configResult} {metadata} onlyConfig />
		</SectionBody>
	</Section>
</div>
