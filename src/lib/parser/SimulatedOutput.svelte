<script lang="ts">
	import {
		RainInterpreterTs,
		rainterpreterOpConfigs,
		Simulation
	} from '@rainprotocol/interpreter-ts';
	import type { StateConfig } from 'rain-sdk';
	import { BigNumber, VoidSigner, type Signer } from 'ethers';
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

	$: if ($vmStateConfig) simulate();

	$: if (signer) console.log('reacting to signer');
	$: if ($vmStateConfig) console.log('reacting to sc');

	const simulate = async () => {
		console.log('running simulate');
		error = null;
		simulatedResult = null;
		if ($vmStateConfig?.sources?.[0]) {
			console.log(await signer.provider?.getNetwork())
			console.log($vmStateConfig);
			const simulator = new RainInterpreterTs(
				'0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
				signer.provider!,
				rainterpreterOpConfigs,
				undefined,
				[$vmStateConfig]
			);
			//simulator.addExpression($vmStateConfig);
			// const simulator = Simulation.rainterpreter(80001, [{interpreterAddress: '0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c', stateConfigs: [$vmStateConfig]}])
			try {
				simulatedResult = await simulator.run(await signer.getAddress(), {
					context: [[BigNumber.from(1)]],
					sender: '0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
					namespace: 'none'
				});
				console.log(simulatedResult);
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
		<!-- {#each simulatedResult as result, i}
			<div>
				Stack {i}: {result.toString()}
			</div>
		{/each} -->
		<div>
			Stack: {simulatedResult.finalStack.map((v) => v.toString())}
			Block Number: {simulatedResult.blockNumber}
			Block Timestamp: {simulatedResult.blockTimestamp}
		</div>
	{/if}
</div>
