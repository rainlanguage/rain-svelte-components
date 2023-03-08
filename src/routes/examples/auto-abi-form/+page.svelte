<script lang="ts">
	import Vapour721A from './Vapour721A.json';
	import FlowERC20Factory from './FlowERC20Factory.json';
	import LobbyFactory from './LobbyFactory.json';
	import LobbyFactoryMetadata from './LobbyFactoryMetadata.json';
	import FlowERC20FactoryMetadata from './FlowERC20FactoryMetadata.json';
	import AutoAbiForm from '$lib/auto-abi-form/AutoAbiForm.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';
	import AutoAbiFormSeparated from '$lib/auto-abi-form/AutoAbiFormSeparated.svelte';
	import OrderBook from './OrderBook.json';
	import OrderBookMetadata from './OrderBook.meta.json';
	import { setContext } from 'svelte';

	let result: any, resultMerged: any, result2: any, resultMergedFlow: any;

	setContext('EVALUABLE_ADDRESSES', {
		getDeployers: async () => {
			// const resp = await fetch('www.some_endpoint.com/get_addresses', {
			// 	method: 'GET'
			// });
			// if (resp.ok) {
			// 	const { interpreterAddresses } = await resp.json();
			// 	return interpreterAddresses;
			// }

			return [{ address: '0xDummyAddress1' }, { address: '0xDummyAddress2' }];
		}
	});
</script>

<div class="flex flex-col gap-y-4 dark:text-gray-100">
	<PageHeading>Auto ABI Form</PageHeading>
	<div class="max-w-prose flex flex-col gap-y-4">
		<div>
			This component takes an ABI and a method name, and produces a form for the required inputs. If
			the type <span class="font-mono inline-block">struct StateConfig</span>
			is found, it will show the parser.
		</div>
		<div>
			Bind to the <span class="font-mono">results</span> prop to get an object that can be spread for
			the method input args.
		</div>
		<div>
			Optionally pass a <span class="font-mono">metadata</span> prop using the contract metadata
			schema defined at
			<a
				class="underline"
				href="https://github.com/rainprotocol/rain-metadata/blob/master/json-schemas/contract.json"
				>https://github.com/rainprotocol/rain-metadata/blob/master/json-schemas/contract.json</a
			>
		</div>
	</div>
	<ExampleHeading id="separated">Separated expressions and config</ExampleHeading>
	<div class="dark:text-white">
		Hide the interpreter and deployer address fields as defined in the metadata by setting the prop <span
			class="font-mono">showInterpreterFields</span
		>
		to <span class="font-mono">false</span>
	</div>
	<Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Contract: OrderBook | Method name: addOrder</div>
					<AutoAbiFormSeparated
						abi={OrderBook.abi}
						metadata={OrderBookMetadata}
						bind:result={resultMerged}
						methodName="addOrder"
						on:save={({ detail }) => {
							console.log(detail);
						}}
						on:load={(event) => {
							console.log(event);
						}}
						on:help={(event) => {
							console.log('help clicked');
						}}
					/>
				</div>
				<div class="p-4">
					<span>Result</span>
					<pre>
						{JSON.stringify(resultMerged, null, 2)}
					</pre>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
	<!-- <Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Contract: FlowERC20Factory | Method name: createChildTyped</div>
					<AutoAbiFormSeparated
						abi={FlowERC20Factory.abi}
						metadata={FlowERC20FactoryMetadata}
						bind:result={resultMergedFlow}
						methodName="createChildTyped"
						on:save={({ detail }) => {
							console.log(detail);
						}}
						on:load={(event) => {
							console.log(event);
						}}
						on:help={(event) => {
							console.log('help clicked');
						}}
					/>
				</div>
				<div class="p-4">
					<span>Result</span>
					<pre>
						{JSON.stringify(resultMergedFlow, null, 2)}
					</pre>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
	<ExampleHeading id="with-parser">With parser</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Method name: createChildTyped</div>
					<AutoAbiForm
						abi={FlowERC20Factory.abi}
						metadata={FlowERC20FactoryMetadata}
						bind:result
						methodName="createChildTyped"
						on:help={(event) => {
							console.log('help clicked');
						}}
					/>
				</div>
				<div class="p-4">
					<span>Result</span>
					<pre>
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example>
	<ExampleHeading id="without-parser">Without parser</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Method name: safeTransferFrom</div>
					<AutoAbiForm
						abi={Vapour721A.abi}
						bind:result={result2}
						methodName="safeTransferFrom"
						on:help={(event) => {
							console.log('help clicked');
						}}
					/>
				</div>
				<div class="p-4">
					<span>Result</span>
					<pre>
						{JSON.stringify(result2, null, 2)}
					</pre>
				</div>
			</div>
		</ExampleComponent>
		<ExampleUsage>example usage here</ExampleUsage>
	</Example> -->
</div>
