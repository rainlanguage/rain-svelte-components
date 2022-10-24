<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';
	import { writable } from 'svelte/store';

	export let component: AbiParameter;
	export let result: any;

	let vmStateConfig = writable({ sources: [], constants: [] });

	$: if ($vmStateConfig.sources.length > 0) result = $vmStateConfig;
	$: type = component.internalType;
</script>

{#if type == 'string'}
	<Input type="text" bind:value={result}>
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'uint256'}
	<Input type="number" bind:value={result}>
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'address'}
	<Input type="text" bind:value={result}>
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'struct StateConfig'}
	<span>expression</span>
	<Parser signer={$signer} bind:vmStateConfig />
{:else if type?.startsWith('struct') && 'components' in component}
	<span>{component.name}</span>
	{#each component.components as subComponent}
		{#if subComponent}
			<svelte:self component={subComponent} bind:result={result[subComponent.name]} />
		{/if}
	{/each}
{/if}
