<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';

	export let component: AbiParameter;
	$: type = component.internalType;
</script>

{#if type == 'string'}
	<Input type="text">
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'uint256'}
	<Input type="number">
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'address'}
	<Input type="text">
		<span slot="label">{component.name}</span>
	</Input>
{:else if type == 'struct StateConfig'}
	<span>Expression</span> fig
	<Parser signer={$signer} />
{:else if type?.startsWith('struct')}
	{#each component.components as component}
		<svelte:self {component} />
	{/each}
{/if}
