<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';
	import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
	import type { StateConfig } from 'rain-sdk';
	import Button from '$lib/Button.svelte';

	export let component: AbiParameter & { nameMeta?: string; descriptionMeta?: string };
	export let result: any = 'components' in component ? {} : undefined;

	$: type = component.internalType;

	// we need to handle the Parser differently as it binds to a store, not a regular value
	let vmStateConfig = writable({ sources: [], constants: [] });
	let stateConfigsStore: Writable<{ id: number; store: Writable<StateConfig> }[]> = writable([
		{ id: 0, store: writable({ sources: [], constants: [] }) }
	]);
	$: stateConfigsArray = derived(
		$stateConfigsStore.map((s) => s.store),
		(x) => x
	);

	$: if (type == 'struct StateConfig') result = $vmStateConfig;
	$: if (type == 'struct StateConfig[]') result = $stateConfigsArray;

	let id = 0;
	const addExpression = () => {
		id++;
		$stateConfigsStore = [
			...$stateConfigsStore,
			{ id, store: writable({ sources: [], constants: [] }) }
		];
	};

	const removeExpression = (instance: any) => {
		$stateConfigsStore = $stateConfigsStore.filter((x) => x.id !== instance.id);
	};
</script>

{#if type == 'string'}
	<Input type="text" bind:value={result}>
		<span slot="label">{component.nameMeta || component.name} ({type})</span>
		<span slot="description"
			>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
		>
	</Input>
{:else if type == 'uint256'}
	<Input type="number" bind:value={result}>
		<span slot="label">{component.nameMeta || component.name} ({type})</span>
		<span slot="description"
			>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
		>
	</Input>
{:else if type == 'address'}
	<Input type="text" bind:value={result}>
		<span slot="label">{component.nameMeta || component.name} ({type})</span>
		<span slot="description"
			>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
		>
	</Input>
{:else if type == 'struct StateConfig'}
	<div>
		{#if component.nameMeta}
			<div class="font-medium">{component.nameMeta}</div>
		{/if}
		{#if component.descriptionMeta}
			<div class="text-sm">{component.descriptionMeta}</div>
		{/if}
	</div>
	<Parser signer={$signer} bind:vmStateConfig />
{:else if type == 'struct StateConfig[]'}
	<div>
		{#if component.nameMeta}
			<div class="font-medium">{component.nameMeta}</div>
		{/if}
		{#if component.descriptionMeta}
			<div class="text-sm">{component.descriptionMeta}</div>
		{/if}
	</div>
	{#each $stateConfigsStore as instance (instance.id)}
		<div class="flex flex-col gap-y-2">
			<Parser signer={$signer} bind:vmStateConfig={instance.store} />
			<button
				class="self-end text-xs underline cursor-pointer"
				on:click={() => {
					removeExpression(instance);
				}}
			>
				Remove
			</button>
		</div>
	{/each}
	<div class="flex justify-center border-t border-gray-200 w-full p-2">
		<Button size="small" on:click={addExpression}>+ Add another</Button>
	</div>
{:else if type?.startsWith('struct') && 'components' in component}
	{#if component.nameMeta}
		<div class="font-medium">{component.nameMeta}</div>
	{:else}
		<span>{component.name}</span>
	{/if}
	{#if component.descriptionMeta}
		<div class="text-sm">{component.descriptionMeta}</div>
	{/if}
	{#each component.components as subComponent}
		{#if subComponent}
			<svelte:self component={subComponent} bind:result={result[subComponent.name]} />
		{/if}
	{/each}
{/if}
