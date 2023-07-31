<script lang="ts">
	import Input from '$lib/Input.svelte';
	import Switch from '$lib/Switch.svelte';
	import type { AbiParameter } from 'abitype';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let value: any;
	export let component: AbiParameter & {
		nameMeta?: string;
		descriptionMeta?: string;
		isInterpreterField?: boolean;
		isDeployerField?: boolean;
	};

	export let configType: 'input' | 'switch' = 'input';
	export let configInputType: 'text' | 'number' | 'range' | 'datetime-local' | 'textarea' = 'text';
	export let noDescription = false;
</script>

{#if configType == 'input'}
	{#if noDescription}
		<Input type={configInputType} bind:value />
	{:else}
		<Input type={configInputType} bind:value>
			<span slot="label">{component.nameMeta || component.name} ({component.internalType})</span>
			<span slot="description"
				>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
			>
		</Input>
	{/if}
{:else if configType == 'switch'}
	{#if noDescription}
		<Switch bind:checked={value} />
	{:else}
		<Switch bind:checked={value}>
			<span slot="label">{component.nameMeta || component.name} ({component.internalType})</span>
			<span slot="description"
				>{#if component.descriptionMeta}{component.descriptionMeta}{/if}</span
			>
		</Switch>
	{/if}
{/if}
