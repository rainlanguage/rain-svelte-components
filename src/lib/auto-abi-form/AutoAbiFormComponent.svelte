<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';
	import { derived, writable, type Writable } from 'svelte/store';
	import type { StateConfig } from 'rain-sdk';
	import Button from '$lib/Button.svelte';
	import { createEventDispatcher, getContext } from 'svelte';

	export let component: AbiParameter & { nameMeta?: string; descriptionMeta?: string };
	export let result: any = 'components' in component ? {} : undefined;

	const dispatch = createEventDispatcher();

	const settings: { onlyConfig: boolean; onlyExpressions: boolean } = getContext('abi-form');

	$: type = component.internalType;

	// if the component is an array of subcomponents
	let arrayedComponents: { id: number; compResult: any }[] = [{ id: 0, compResult: {} }];

	$: if (arrayedComponents) updateResult();

	const updateResult = () => {
		if (type?.endsWith('[]') && type !== 'StateConfig[]' && !settings.onlyExpressions) {
			result = arrayedComponents.map((comp) => comp.compResult);
		}
	};

	// methods for adding and removing arrayed components
	let arrayedComponentId = 0;
	const addArrayedComponent = () => {
		arrayedComponentId++;
		arrayedComponents = [...arrayedComponents, { id: arrayedComponentId, compResult: {} }];
	};

	const removeArrayedComponent = (arrayedComponent: any) => {
		arrayedComponents = arrayedComponents.filter((x) => x.id !== arrayedComponent.id);
	};

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

	let expressionId = 0;
	const addExpression = () => {
		expressionId++;
		$stateConfigsStore = [
			...$stateConfigsStore,
			{ id: expressionId, store: writable({ sources: [], constants: [] }) }
		];
	};

	const removeExpression = (instance: any) => {
		$stateConfigsStore = $stateConfigsStore.filter((x) => x.id !== instance.id);
	};
</script>

{#if !settings.onlyExpressions}
	{#if type == 'string'}
		<Input type="text" bind:value={result}>
			<span slot="label">{component.nameMeta || component.name} ({type})</span>
			<span slot="description"
				>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
			>
		</Input>
	{:else if type?.startsWith('uint')}
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
	{/if}
{/if}
{#if !settings.onlyConfig}
	{#if type == 'struct StateConfig'}
		<div>
			{#if component.nameMeta}
				<div class="font-medium">{component.nameMeta}</div>
			{/if}
			{#if component.descriptionMeta}
				<div class="text-sm">{component.descriptionMeta}</div>
			{/if}
		</div>
		<Parser signer={$signer} bind:vmStateConfig on:save on:load on:expand />
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
				<Parser signer={$signer} bind:vmStateConfig={instance.store} on:save on:load on:expand />
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
	{/if}
{/if}
{#if type?.startsWith('struct') && 'components' in component && type !== 'struct StateConfig' && type !== 'struct StateConfig[]'}
	{#if !settings.onlyExpressions}
		{#if component.nameMeta}
			<div class="font-medium col-span-full">{component.nameMeta}</div>
		{:else}
			<span class="col-span-full">{component.name}</span>
		{/if}
		{#if component.descriptionMeta}
			<div class="text-sm col-span-full">{component.descriptionMeta}</div>
		{/if}
	{/if}
	{#if type?.endsWith('[]') && type !== 'struct StateConfig[]' && !settings.onlyExpressions}
		{#each arrayedComponents as arrayedComponent (arrayedComponent.id)}
			{#each component.components as subComponent}
				{#if subComponent}
					<svelte:self
						component={subComponent}
						bind:result={arrayedComponent.compResult[subComponent.name]}
						on:save
						on:load
						on:expand
					/>
				{/if}
			{/each}
			<div class="col-span-full flex w-full justify-end">
				<button
					class="self-end text-xs underline cursor-pointer"
					on:click={() => {
						removeArrayedComponent(arrayedComponent);
					}}
				>
					Remove
				</button>
			</div>
		{/each}
		<div class="flex justify-center border-t border-gray-200 w-full p-2 col-span-full">
			<Button size="small" on:click={addArrayedComponent}>+ Add another</Button>
		</div>
	{:else}
		{#each component.components as subComponent}
			{#if subComponent}
				<svelte:self
					component={subComponent}
					bind:result={result[subComponent.name]}
					on:save
					on:load
					on:expand
				/>
			{/if}
		{/each}
	{/if}
{/if}
