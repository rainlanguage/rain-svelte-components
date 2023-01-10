<script lang="ts">
	import { RainInterpreterTs, rainterpreterOpConfigs } from '@rainprotocol/interpreter-ts';
	import type { StateConfig } from 'rain-sdk';
	import type { BigNumber, Signer } from 'ethers';
	import { ethers } from 'ethers';
	import type { Writable } from 'svelte/store';

	export let vmStateConfig: Writable<StateConfig>;
	export let signer: Signer = new ethers.VoidSigner('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
	export let chainId: number = 80001;
	export let context: BigNumber[][] = [];
	let error: string | null;

	enum ResultState {
		EmptyOrNoStateConfig,
		Calculating,
		Ready,
		Error
	}

	let resultState: ResultState = ResultState.EmptyOrNoStateConfig;

	let simulatedResults: {
		matchingBlocks: boolean;
		results: {
			finalStack: BigNumber[];
			blockNumber: number;
			blockTimestamp: number;
		}[];
	};

	$: simulate($vmStateConfig, context);

	const simulate = async (vmStateConfig: StateConfig | null, _context: BigNumber[][]) => {
		error = null;
		resultState = ResultState.Calculating;
		if (!vmStateConfig || !vmStateConfig?.sources?.[0]) {
			resultState = ResultState.EmptyOrNoStateConfig;
			return;
		}
		const simulator = new RainInterpreterTs(
			'0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
			chainId,
			rainterpreterOpConfigs,
			undefined,
			[vmStateConfig]
		);
		try {
			const resultPromises = vmStateConfig.sources.map(async (source, i) => ({
				...(await simulator.run(
					await signer.getAddress(),
					{
						context: _context,
						namespace: 'none'
					},
					{ entrypoint: i }
				))
			}));
			const results = await Promise.all(resultPromises);
			const matchingBlocks = results.every(
				(result) => result.blockNumber == results[0].blockNumber
			);
			simulatedResults = { matchingBlocks, results };
			resultState = ResultState.Ready;
		} catch (err: any) {
			error = err;
			resultState = ResultState.Error;
			console.log(err);
		}
	};
</script>

<div class="font-mono text-gray-800 dark:text-gray-200 text-sm">
	{#if resultState == ResultState.EmptyOrNoStateConfig}
		<div class="flex flex-col gap-y-2">
			<div>Nothing to simulate.</div>
			<div>(If you're expecting to see something here, check your expression for errors.)</div>
		</div>
	{:else if resultState == ResultState.Error}
		<div class="text-red-500 text-xs leading-tight pb-2">{error}</div>
	{:else if resultState == ResultState.Calculating}
		<div class="animate-pulse">calculating...</div>
	{:else if resultState == ResultState.Ready}
		<div class="flex flex-col gap-y-2">
			{#if simulatedResults}
				{#each simulatedResults.results as result, i}
					<div class="flex flex-col">
						<span class="font-semibold">Stack (Source {i})</span>
						{#each result.finalStack.map((v) => v.toString()) as stackItem, i}
							<span class="truncate text-ellipsis">
								{i}: <span class="text-blue-600">{stackItem}</span>
							</span>
						{/each}
					</div>
					{#if !simulatedResults.matchingBlocks || i == simulatedResults.results.length - 1}
						<div class="text-xs flex flex-col text-gray-600">
							<span>
								Block Number: {result.blockNumber}
							</span>
							<span>
								Block Time: {new Date(result.blockTimestamp * 1000).toLocaleTimeString()}
							</span>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
</div>
