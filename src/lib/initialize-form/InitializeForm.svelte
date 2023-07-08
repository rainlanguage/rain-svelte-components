<script lang="ts">
	import { merge } from 'lodash-es';
	import FormComponent from './FormComponent.svelte';
	import { Section, SectionBody, SectionHeading } from '$lib/section';

	import type { Abi } from 'abitype';

	//

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
