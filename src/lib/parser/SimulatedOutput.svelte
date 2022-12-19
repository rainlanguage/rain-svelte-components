<script lang="ts">
	import {
		RainInterpreterTs,
		rainterpreterClosures,
		Simulation
	} from '@beehiveinnovation/rain-interpreter-ts';
	import type { StateConfig } from 'rain-sdk';
	import { BigNumber, type Signer } from 'ethers';
	import { ethers } from 'ethers';
	import type { Writable } from 'svelte/store';

	export let vmStateConfig: Writable<StateConfig>;
	export let signer: Signer = new ethers.VoidSigner('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
	let error: string | null;

	let simulatedResult: {
		finalStack: BigNumber[];
		blockNumber: number;
		blockTimestamp: number;
	} | null;

	$: if ($vmStateConfig && signer) simulate();

	const simulate = async () => {
		error = null;
		simulatedResult = null;
		if ($vmStateConfig?.sources?.[0]) {
			const simulator = await RainInterpreterTs.init(
				'0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
				80001,
				rainterpreterClosures
			);
			simulator.addExpression($vmStateConfig);
			// const simulator = Simulation.rainterpreter(80001, [{interpreterAddress: '0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c', stateConfigs: [$vmStateConfig]}])
			try {
				simulatedResult = await simulator.run(await signer.getAddress(), {
					context: [[BigNumber.from(1)]],
					sender: '0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
					namespace: 'none'
				});
				// simulatedResult = await simulator.run({ context: [await signer.getAddress()] });
			} catch (err: any) {
				console.log(err);
				if (String(err).startsWith('Error: missing provider')) {
					error = 'This expression requires a connected wallet.';
				}
			}
		}
	};
</script>

<div class="font-mono text-gray-800 dark:text-gray-200">
	{#if error}
		<span class="text-red-500 text-xs leading-tight">{error}</span>
	{/if}
	{#if simulatedResult}
		{#each simulatedResult as result, i}
			<div>
				Stack {i}: {result.toString()}
			</div>
		{/each}
	{/if}
</div>
