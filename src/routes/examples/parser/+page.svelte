<script lang="ts">
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import ParserInput from '$lib/parser/ParserInput.svelte';
	import SimulatedOutput from '$lib/parser/SimulatedOutput.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import { getOpMetaFromSg, type ExpressionConfig, type RDProblem } from '@rainprotocol/rainlang';
	import { setContext } from 'svelte';
	import { signer } from 'svelte-ethers-store';
	import { writable, type Writable } from 'svelte/store';

	const emptySc: ExpressionConfig = { sources: [], constants: [] };

	let expressionConfig: Writable<ExpressionConfig> = writable(emptySc);
	let raw: string;
	let events: string[] = [];
	let rawToLoad: string;
	let error: string = '';
	let errors: RDProblem[] = [];
	let readOnly = false;

	const opMetaPromise = getOpMetaFromSg('0x01D5611c2D6FB7Bb1bFa9df2f524196743f59F2a', 524289);

	setContext('EVALUABLE_ADDRESSES', {
		getAddresses: async () => {
			const resp = await fetch('www.some_endpoint.com/get_addresses', {
				method: 'GET'
			});
			if (resp.ok) {
				const { interpreterAddresses } = await resp.json();
				return interpreterAddresses;
			}

			return ['0xDummyAddress1', '0xDummyAddress2'];
		}
	});

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

	To know which interpreter deployer addresses will be use to simulated or send the transaction, and
	a getter function should be provide in context to allow the parser obtain them. You can set
	whatever fill your needs.

	<ExampleUsage>
		{`setContext('EVALUABLE_ADDRESSES', {
	getAddresses: async () => {
		const resp = await fetch('www.some_endpoint.com/get_addresses', {
			method: 'GET'
		});
		if (resp.ok) {
			const { interpreterAddresses } = await resp.json();
			return interpreterAddresses;
		}

		return [];
	}
});`}
	</ExampleUsage>

	<ExampleHeading>Default usage</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="flex flex-col gap-y-2">
				<div class="bg-gray-100 dark:bg-gray-800 h-[200px] overflow-auto flex flex-col">
					{#await opMetaPromise then opMeta}
						<ParserInput {expressionConfig} bind:raw bind:errors {readOnly} {opMeta} />
					{/await}
				</div>
				<span>Simulated output</span>
				<div class="bg-gray-100 p-3 dark:bg-gray-800">
					<SimulatedOutput {expressionConfig} signer={$signer} externalError={error} />
				</div>
				<span>Diagnostics</span>
				<div class="bg-gray-100 dark:bg-gray-800 p-3">
					{#each errors as problem}
						{problem.msg}
					{/each}
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
					{#await opMetaPromise then opMeta}
						<Parser
							on:save={saveEvent}
							on:load={loadEvent}
							on:expand={expandEvent}
							signer={$signer}
							bind:errors
							{opMeta}
						/>
					{/await}
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
