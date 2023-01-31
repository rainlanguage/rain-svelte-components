<script lang="ts">
	import {
		defaultProvidersUrls,
		RainInterpreterTs,
		rainterpreterOpConfigs
	} from '@rainprotocol/interpreter-ts';
	import type { StateConfig } from 'rain-sdk';
	import type { BigNumber, Signer } from 'ethers';
	import { ethers } from 'ethers';
	import type { Writable } from 'svelte/store';
	import { allChainsData } from 'svelte-ethers-store';
	import Select from '$lib/Select.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowPath } from '@steeze-ui/heroicons';

	export let vmStateConfig: Writable<StateConfig>;
	export let signer: Signer = new ethers.VoidSigner('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
	export let chainId: number = 80001;
	export let context: BigNumber[][] = [];
	export let externalError: string;
	let error: string | null;

	const providers = Object.keys(defaultProvidersUrls).map((chainId) => ({
		value: parseInt(chainId),
		label: allChainsData.find((chain) => chain.chainId == parseInt(chainId))?.name || 'Unknown'
	}));

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

	$: simulate($vmStateConfig, context, chainId);

	const run = () => {
		simulate($vmStateConfig, context, chainId);
	};

	const simulate = async (
		vmStateConfig: StateConfig | null,
		_context: BigNumber[][],
		_chainId: number
	) => {
		error = null;
		if (!vmStateConfig || !vmStateConfig?.sources?.[0]) {
			resultState = ResultState.EmptyOrNoStateConfig;
			return;
		}

		resultState = ResultState.Calculating;
		const simulator = new RainInterpreterTs(
			'0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
			_chainId,
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

<div class="text-gray-800 dark:text-gray-200 text-sm flex flex-col gap-y-2">
	<div class="flex justify-between border-b border-gray-300 pb-2">
		<div class="self-start">
			<Select items={providers} bind:value={chainId} small />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={run}
			class="w-4 cursor-pointer"
			class:animate-spin={resultState == ResultState.Calculating}
		>
			<Icon src={ArrowPath} />
		</div>
	</div>
	{#if error || externalError}
		<div class="text-red-500 text-xs leading-tight pb-2">{error || externalError}</div>
	{:else if resultState == ResultState.EmptyOrNoStateConfig}
		<div class="flex flex-col gap-y-2">
			<div>Nothing to simulate.</div>
		</div>
	{:else if resultState == ResultState.Calculating}
		<div class="animate-pulse">calculating...</div>
	{:else if resultState == ResultState.Ready}
		<div class="flex flex-col gap-y-2 font-mono">
			{#if simulatedResults}
				{#each simulatedResults.results as result, i}
					<div class="flex flex-col">
						<span class="font-semibold">Stack (Source {i})</span>
						{#each result.finalStack.map((v) => v.toString()) as stackItem, i}
							<span class="truncate text-ellipsis">
								{i}: <span class="text-blue-600 dark:text-blue-400">{stackItem}</span>
							</span>
						{/each}
					</div>
					{#if !simulatedResults.matchingBlocks || i == simulatedResults.results.length - 1}
						<div class="text-xs flex flex-col text-gray-600 dark:text-gray-100">
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
