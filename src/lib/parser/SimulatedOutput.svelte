<script lang="ts">
	import { RainInterpreterTs, rainterpreterOpConfigs } from '@rainprotocol/interpreter-ts';
	import type { StateConfig } from 'rain-sdk';
	import { BigNumber, type Signer } from 'ethers';
	import { ethers } from 'ethers';
	import type { Writable } from 'svelte/store';

	export let vmStateConfig: Writable<StateConfig>;
	export let signer: Signer = new ethers.VoidSigner('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
	export let chainId: number = 80001;
	let error: string | null;

	let simulatedResult: {
		finalStack: BigNumber[];
		blockNumber: number;
		blockTimestamp: number;
	} | null;

	$: simulate($vmStateConfig);

	const simulate = async (vmStateConfig: StateConfig | null) => {
		console.log(vmStateConfig);
		error = null;
		simulatedResult = null;
		if (!vmStateConfig) return;
		if (vmStateConfig?.sources?.[0]) {
			const simulator = new RainInterpreterTs(
				'0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
				chainId,
				rainterpreterOpConfigs,
				undefined,
				[vmStateConfig]
			);
			try {
				simulatedResult = await simulator.run(await signer.getAddress(), {
					context: [[BigNumber.from(1)]],
					sender: '0xF4d1dbA59eABac89a9C37eB5F5bbC5F5b7Ab6B8c',
					namespace: 'none'
				});
				console.log(simulatedResult);
			} catch (err: any) {
				console.log(err);
				if (String(err).startsWith('Error: missing provider')) {
					error = 'This expression requires a connected wallet.';
				}
			}
		}
	};
</script>

<div class="font-mono text-gray-800 dark:text-gray-200 text-sm">
	{#if error}
		<span class="text-red-500 text-xs leading-tight">{error}</span>
	{/if}

	<div class="flex flex-col gap-y-2">
		<div class="flex flex-col">
			<span class="font-semibold"> Stack</span>
			{#if simulatedResult}
				{#each simulatedResult.finalStack.map((v) => v.toString()) as result, i}
					<span>
						{i}: <span class="text-blue-600">{result}</span>
					</span>
				{/each}
			{/if}
		</div>
		<div class="text-xs flex flex-col text-gray-600">
			<span>
				Block Number: {#if simulatedResult}{simulatedResult.blockNumber}{/if}
			</span>
			<span>
				Block Timestamp: {#if simulatedResult}{simulatedResult.blockTimestamp}{/if}
			</span>
		</div>
	</div>
</div>
