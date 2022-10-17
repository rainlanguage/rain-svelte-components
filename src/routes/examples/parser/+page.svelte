<script lang="ts">
	import ExampleComponent from '$lib/ExampleComponent.svelte';
	import ExampleUsage from '$lib/ExampleUsage.svelte';
	import Example from '$lib/Example.svelte';
	import ExampleHeading from '$lib/ExampleHeading.svelte';
	import PageHeading from '$lib/PageHeading.svelte';
	import Parser from '$lib/package/parser/Parser.svelte';
	import { EmissionsERC20JSVM, type StateConfig } from 'rain-sdk';
	import { writable, type Writable } from 'svelte/store';
	import { signer, signerAddress } from 'svelte-ethers-store';

	let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
	let simulatedResult;

	$: console.log($vmStateConfig);
	$: if ($vmStateConfig && $signer) simulate();

	const simulate = async () => {
		simulatedResult = null;
		if ($vmStateConfig?.sources[0]) {
			const simulator = new EmissionsERC20JSVM($vmStateConfig, { signer: $signer });
			simulatedResult = await simulator.run({ context: [$signerAddress] });
			console.log(simulatedResult);
		}
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Parser</PageHeading>
	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Parser {vmStateConfig} />
			{#if simulatedResult}
				{simulatedResult}
			{/if}
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
