<script lang="ts">
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import { signer } from 'svelte-ethers-store';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { writable, type Writable } from 'svelte/store';
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import Input from '$lib/Input.svelte';
	import RainlangEditor from '$lib/parser/RainlangEditor.svelte';
	import { darkMode } from '$lib/darkModeAction';

	const emptySc: ExpressionConfig = { sources: [], constants: [] };

	let vmStateConfig: Writable<ExpressionConfig> = writable(emptySc);
	let raw: string;
	let events: string[] = [];
	let rawToLoad: string;

	const saveEvent = ({ detail }: CustomEvent<{ raw: string }>) => {
		events = [`A save event was emitted with the raw string: ${detail.raw}`, ...events];
	};

	const loadEvent = ({ detail }: CustomEvent<{ loadRaw: Function }>) => {
		events = ['A load event was emitted.', ...events];
		detail.loadRaw(rawToLoad);
	};

	const expandEvent = ({ detail }: CustomEvent<{ loadRaw: Function }>) => {
		events = ['An expand event was emitted.', ...events];
	};
</script>

<div class="flex flex-col gap-y-4">
	<PageHeading>Parser</PageHeading>

	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-2">
				<div class="bg-gray-100 dark:bg-gray-800 h-[200px] overflow-auto flex flex-col">
					<!-- <ParserInput {vmStateConfig} bind:raw /> -->
					<RainlangEditor {vmStateConfig} bind:raw dark={$darkMode} />
				</div>
				<span>Simulated output</span>
				<div class="bg-gray-100 p-3 dark:bg-gray-800">
					<SimulatedOutput {vmStateConfig} signer={$signer} />
				</div>
				<span>Raw text</span>
				<div class="bg-gray-100 dark:bg-gray-800 p-3">
					{raw}
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>

	<ExampleHeading>Full parser</ExampleHeading>
	<div class="dark:text-white flex flex-col gap-y-2">
		<p>
			Component will emit <span class="font-mono">load</span>,
			<span class="font-mono">save</span> and <span class="font-mono">expand</span> events when the buttons
			are pressed.
		</p>
		<p>The save event has the raw expression text in its detail.</p>
		<p>To load raw text into the parser, use Parser.loadRaw(text).</p>
		<p>The load event will have the loadRaw function for that parser in its detail.</p>
		<p>The expand event has the loadRaw function and the raw text in its detail.</p>
		<p>The help event has no detail.</p>
		<p>Hide the buttons by setting hideHelp, hideLoad, hideSave or hideExpand props to true.</p>
	</div>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-4">
				<Input type="textarea" bind:value={rawToLoad}>
					<span slot="label">Enter raw text to load into parser here.</span>
				</Input>
				<div class="min-h-[150px] flex flex-col">
					<Parser
						on:save={saveEvent}
						on:load={loadEvent}
						on:expand={expandEvent}
						signer={$signer}
					/>
				</div>
				<div class="flex flex-col gap-y-2">
					{#each events as event}
						<span>{event}</span>
					{/each}
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage />
	</Example>
</div>
