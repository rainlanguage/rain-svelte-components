<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import { writable, type Writable } from 'svelte/store';
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import type { StateConfig } from 'rain-sdk';
	import Parser from '$lib/parser/Parser.svelte';

	let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Parser</PageHeading>

	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-2">
				<div class="overflow-hidden bg-gray-100">
					<ParserInput {vmStateConfig} />
				</div>
				<span>Simulated output</span>
				<div class="bg-gray-100 p-3">
					<SimulatedOutput {vmStateConfig} signer={$signer} />
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Full parser</ExampleHeading>
	<Example>
		<ExampleComponent>
			<Parser signer={$signer} />
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
