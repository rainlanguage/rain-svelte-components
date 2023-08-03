<script lang="ts">
	import { signer } from 'svelte-ethers-store';
	import Parser from '$lib/parser/Parser.svelte';
	import type { AbiParameter } from 'abitype';
	import Button from '$lib/Button.svelte';
	import { getContext, onMount } from 'svelte';
	import { constructEvaluableConfig, type EvaluableConfig } from '$lib/parser/types';
	import ConfigurationSlot from './ConfigurationSlot.svelte';
	import { isHexString } from 'ethers/lib/utils';

	export let component: AbiParameter & {
		nameMeta?: string;
		descriptionMeta?: string;
		isInterpreterField?: boolean;
		isDeployerField?: boolean;
	};
	export let result: any = 'components' in component ? {} : undefined;

	export let noDescription = false;

	const settings: {
		onlyConfig: boolean;
		onlyExpressions: boolean;
		showInterpreterFields: boolean;
	} = getContext('abi-form');

	// If the internal type refers to an interface of some contract, the external type must be used.
	$: type = component.internalType?.startsWith('contract')
		? component.type
		: component.internalType;

	// if the component is an array of subcomponents
	let arrayedComponents: { id: number; compResult: any }[] = [{ id: 0, compResult: {} }];

	$: if (arrayedComponents) updateResult();

	const updateResult = () => {
		if (type?.endsWith('[]') && type !== 'EvaluableConfig[]' && !settings.onlyExpressions) {
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
	let evaluableConfig: EvaluableConfig;

	// code for handling arrays of expressions

	// we need to include an id so svelte will properly destroy the component when we remove one from the array
	// init one to start
	let evaluableConfigs: { id: number; evaluableConfig: EvaluableConfig }[] = [];

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

	const isLastComponent = (component_: { id: any }[], id_: any): boolean => {
		return component_[component_.length - 1].id === id_;
	};

	const isValidHex = async (value: any) => {
		if (!isHexString(value)) {
			return { error: 'Not a valid hexadecimal value. (Eg. 0x0a..9f)' };
		}

		// (value.length % 2) allow to know if the byte length is odd or no. It is
		// required even bytes.
		if (typeof value === 'string' && value.length % 2) {
			return { error: 'Hex bytes are odd-length. (Eg. 0x1234)' };
		}

		return true;
	};

	// Just one scope of this reactive result
	$: {
		if (type == 'bytes') result = undefined;
		if (type == 'struct EvaluableConfig') result = evaluableConfig;
		if (type == 'struct EvaluableConfig[]') result = evaluableConfigs.map((e) => e.evaluableConfig);
	}

	// if this component is a list of expressions, add the first one
	onMount(() => {
		if (type == 'struct EvaluableConfig[]' && !settings.onlyConfig) addExpression();
	});
</script>

{#if !((component?.isInterpreterField || component?.isDeployerField) && !settings.showInterpreterFields)}
	{#if !settings.onlyExpressions}
		{#if !type?.startsWith('struct')}
			{#if !type?.endsWith('[]')}
				{#if type == 'string'}
					<ConfigurationSlot bind:value={result} {component} {noDescription} />
				{:else if type?.startsWith('uint')}
					<ConfigurationSlot
						bind:value={result}
						{component}
						configInputType="number"
						{noDescription}
					/>
				{:else if type == 'address'}
					<ConfigurationSlot bind:value={result} {component} {noDescription} />
				{:else if type == 'bool'}
					<ConfigurationSlot bind:value={result} {component} configType="switch" {noDescription} />
				{:else if type == 'bytes'}
					value: {result}

					<ConfigurationSlot
						bind:value={result}
						{component}
						{noDescription}
						validatorInput={isValidHex}
					/>
				{/if}
			{:else}
				<span class="text-gray-500 dark:text-gray-200 text-sm font-medium"
					>{component.nameMeta || component.name} ({type})</span
				>

				{#each arrayedComponents as arrayedComponent (arrayedComponent.id)}
					<svelte:self
						component={{
							name: component.name,
							internalType: component.internalType?.replace('[]', ''),
							type: component.type?.replace('[]', '')
						}}
						bind:result={arrayedComponent.compResult}
						noDescription
						on:save
						on:load
						on:expand
						on:help
					/>
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
				<div class="self-center">
					<Button size="small" on:click={addArrayedComponent}>+ Add another</Button>
				</div>
			{/if}
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
	{#if type?.endsWith('[]') && !settings.onlyExpressions}
		{#each arrayedComponents as arrayedComponent (arrayedComponent.id)}
			<div
				class="component"
				class:component-last={isLastComponent(arrayedComponents, arrayedComponent.id)}
			>
				{#each component.components as subComponent}
					{#if subComponent && subComponent.name}
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
					on:help
				/>
			{/if}
		{/each}
	{/if}
{/if}

<style lang="postcss">
	.component {
		@apply gap-y-4 flex flex-col border-b border-gray-200 pb-4;
	}

	.component-last {
		@apply border-0 pb-0;
	}
</style>
