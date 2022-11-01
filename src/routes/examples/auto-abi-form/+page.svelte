<script lang="ts">
	import Vapour721AFactory from './Vapour721AFactory.json';
	import Vapour721A from './Vapour721A.json';
	import Vapour721AMetadata from './Vapour721AMetadata.json';
	import AutoAbiForm from '$lib/auto-abi-form/AutoAbiForm.svelte';
	import PageHeading from '$lib/_docs/PageHeading.svelte';
	import ExampleHeading from '$lib/_docs/ExampleHeading.svelte';
	import Example from '$lib/_docs/Example.svelte';
	import ExampleComponent from '$lib/_docs/ExampleComponent.svelte';
	import ExampleUsage from '$lib/_docs/ExampleUsage.svelte';

	let result: any, result2: any;
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
				href="https://github.com/beehive-innovation/rain-metadata/blob/master/json-schemas/contract.json"
				>https://github.com/beehive-innovation/rain-metadata/blob/master/json-schemas/contract.json</a
			>
		</div>
	</div>
	<ExampleHeading>With parser</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Method name: createChildTyped</div>
					<AutoAbiForm
						abi={Vapour721AFactory.abi}
						metadata={Vapour721AMetadata}
						bind:result
						methodName="createChildTyped"
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
	<ExampleHeading>Without parser</ExampleHeading>
	<Example>
		<ExampleComponent>
			<div class="grid grid-cols-3">
				<div class="col-span-2">
					<div class="text-xl mb-2">Method name: safeTransferFrom</div>
					<AutoAbiForm abi={Vapour721A.abi} bind:result={result2} methodName="safeTransferFrom" />
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
	</Example>
</div>
