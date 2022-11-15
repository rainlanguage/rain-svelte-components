<script lang="ts">
	import ParserInput from '$lib/slateParser/ParserInput.svelte';
	import { signer } from 'svelte-ethers-store';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { writable, type Writable } from 'svelte/store';
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import type { StateConfig } from 'rain-sdk';
	import Parser from '$lib/parser/Parser.svelte';
	import type { SvelteComponent } from 'svelte';
	import Input from '$lib/Input.svelte';

	let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
	let raw: string;
	let events: string[] = [];
	let parser: SvelteComponent;
	let rawToLoad: string;

	const saveEvent = ({ detail }: CustomEvent<{ raw: string }>) => {
		events = [`A save event was emitted with the raw string: ${detail.raw}`, ...events];
	};

	const loadEvent = () => {
		events = ['A load event was emitted.', ...events];
		parser.loadRaw(rawToLoad);
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Parser</PageHeading>

	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-2">
				<div class="overflow-hidden bg-gray-100">
					<ParserInput {vmStateConfig} bind:raw />
				</div>
				<span>Simulated output</span>
				<div class="bg-gray-100 p-3">
					<SimulatedOutput {vmStateConfig} signer={$signer} />
				</div>
				<span>Raw text</span>
				<div class="bg-gray-100 p-3">
					{raw}
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Full parser</ExampleHeading>
	<div>
		Component will emit <span class="font-mono">load</span> and <span class="font-mono">save</span> events
		when the buttons are pressed.
	</div>
	<div>The save event has the raw expression text in its detail.</div>
	<div>To load raw text into the parser, call Parser.loadRaw(text).</div>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-4">
				<Input bind:value={rawToLoad}>
					<span slot="label">Enter raw text to load into parser here.</span>
				</Input>
				<Parser on:save={saveEvent} on:load={loadEvent} signer={$signer} bind:this={parser} />
				<div class="flex flex-col gap-y-2">
					{#each events as event}
						<span>{event}</span>
					{/each}
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
</div>
