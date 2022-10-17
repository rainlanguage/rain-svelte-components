<script lang="ts">
	import { RainJSVM, type StateConfig } from 'rain-sdk';
	import type { BigNumber, Signer } from 'ethers';
	import { ethers } from 'ethers';
	import type { Writable } from 'svelte/store';

	export let vmStateConfig: Writable<StateConfig>;
	export let signer: Signer = new ethers.VoidSigner('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
	let error: string | null;

	let simulatedResult: BigNumber[] | null;

	$: if ($vmStateConfig && signer) simulate();

	const simulate = async () => {
		error = null;
		simulatedResult = null;
		if ($vmStateConfig?.sources[0]) {
			const simulator = new RainJSVM($vmStateConfig, { signer });
			try {
				simulatedResult = await simulator.run({ context: [await signer.getAddress()] });
			} catch (err: any) {
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
