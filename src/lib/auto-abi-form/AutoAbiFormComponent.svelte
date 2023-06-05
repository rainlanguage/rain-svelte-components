<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Input from '$lib/Input.svelte';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';
	import Button from '$lib/Button.svelte';
	import { getContext, onMount, tick } from 'svelte';
	import Switch from '$lib/Switch.svelte';
	import { constructEvaluableConfig, type EvaluableConfig } from '$lib/parser/types';

	export let component: AbiParameter & {
		nameMeta?: string;
		descriptionMeta?: string;
		isInterpreterField?: boolean;
		isDeployerField?: boolean;
	};
	export let result: any = 'components' in component ? {} : undefined;

	const settings: {
		onlyConfig: boolean;
		onlyExpressions: boolean;
		showInterpreterFields: boolean;
	} = getContext('abi-form');

	$: type = component.internalType;

	// if the component is an array of subcomponents
	let arrayedComponents: { id: number; compResult: any }[] = [{ id: 0, compResult: {} }];

	const updateResult = async () => {
		if (type?.endsWith('[]') && type !== 'EvaluableConfig[]' && !settings.onlyExpressions) {
			await tick();
			result = arrayedComponents.map((comp) => comp.compResult);
		}
	};

	$: if (arrayedComponents) updateResult();

	// methods for adding and removing arrayed components
	let arrayedComponentId = 0;
	const addArrayedComponent = async () => {
		arrayedComponentId++;
		arrayedComponents = [...arrayedComponents, { id: arrayedComponentId, compResult: {} }];
	};

	const removeArrayedComponent = (arrayedComponent: any) => {
		arrayedComponents = arrayedComponents.filter((x) => x.id !== arrayedComponent.id);
	};

	// we need to handle the Parser differently as it binds to a store, not a regular value
	let evaluableConfig: EvaluableConfig;

	// code for handling arrays of expressions

	// we need to include an id so svelte will properly destroy the component when we remove one from the array
	// init one to start
	let evaluableConfigs: { id: number; evaluableConfig: EvaluableConfig }[] = [];

	$: if (type == 'struct EvaluableConfig') result = evaluableConfig;
	$: if (type == 'struct EvaluableConfig[]')
		result = evaluableConfigs.map((e) => e.evaluableConfig);

	let evaluableConfigId = 0;
	const addExpression = () => {
		evaluableConfigs = [
			...evaluableConfigs,
			{ id: evaluableConfigId, evaluableConfig: constructEvaluableConfig() }
		];
		evaluableConfigId++;
	};

	const removeExpression = (instance: any) => {
		evaluableConfigs = evaluableConfigs.filter((x) => x.id !== instance.id);
	};

	// if this component is a list of expressions, add the first one
	onMount(() => {
		if (type == 'struct EvaluableConfig[]' && !settings.onlyConfig) addExpression();
	});
</script>

{#if !((component?.isInterpreterField || component?.isDeployerField) && !settings.showInterpreterFields)}
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
		{:else if type == 'bool'}
			<Switch bind:checked={result}>
				<span slot="label">{component.nameMeta || component.name} ({type})</span>
				<span slot="description"
					>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
				>
			</Switch>
		{:else if type == 'bytes'}
			<Input type="text" bind:value={result}>
				<span slot="label">{component.nameMeta || component.name} ({type})</span>
				<span slot="description"
					>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
				>
			</Input>
		{/if}
	{/if}
{/if}
{#if !settings.onlyConfig}
	{#if type == 'struct EvaluableConfig'}
		<div>
			{#if component.nameMeta}
				<div class="font-medium">{component.nameMeta}</div>
			{/if}
			{#if component.descriptionMeta}
				<div class="text-sm">{component.descriptionMeta}</div>
			{/if}
		</div>
		<Parser
			signer={$signer}
			bind:evaluableConfig
			on:save
			on:load
			on:expand
			on:help
			componentName={component.nameMeta || component.name}
		/>
	{:else if type == 'struct EvaluableConfig[]'}
		<div>
			{#if component.nameMeta}
				<div class="font-medium">{component.nameMeta}</div>
			{/if}
			{#if component.descriptionMeta}
				<div class="text-sm">{component.descriptionMeta}</div>
			{/if}
		</div>
		{#each evaluableConfigs as instance (instance.id)}
			<div class="flex flex-col gap-y-2">
				<Parser
					signer={$signer}
					bind:evaluableConfig={instance.evaluableConfig}
					on:save
					on:load
					on:expand
					on:help
					componentName={component.nameMeta || component.name}
				/>
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
{#if type?.startsWith('struct') && 'components' in component && type !== 'struct EvaluableConfig' && type !== 'struct EvaluableConfig[]'}
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
	{#if type?.endsWith('[]') && type !== 'struct EvaluableConfig[]' && !settings.onlyExpressions}
		{#each arrayedComponents as arrayedComponent (arrayedComponent.id)}
			{#each component.components as subComponent}
				{#if subComponent}
					<svelte:self
						component={subComponent}
						bind:result={arrayedComponent.compResult[subComponent.name]}
						on:save
						on:load
						on:expand
						on:help
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
				{#if result == undefined}
					<!-- {console.log(subComponent)} -->
				{/if}
				<svelte:self
					component={subComponent}
					bind:result={result[subComponent.name]}
					on:save
					on:load
					on:expand
					on:help
				/>
			{/if}
		{/each}
	{/if}
{/if}
