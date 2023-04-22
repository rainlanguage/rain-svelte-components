<script lang="ts">
	import { setContext } from 'svelte';
	import type { Deployer } from '$lib/parser/types';
	import { writable, type Writable } from 'svelte/store';
	import type { ExpressionConfig } from '@rainprotocol/rainlang';
	import type { Signer } from 'ethers';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let expressionConfig: Writable<ExpressionConfig> = writable({
		sources: [],
		constants: []
	});
	export let Component: any;
	export let context_key;
	export let context_value;
	export let deployers: Deployer[] = [];
	export let selectedDeployer: Writable<Deployer> = writable();
	export let raw: string;
	export let loadRaw: any = null;
	export let componentName: string | null = null;
	export let hideLoad: boolean = false;
	export let hideExpand: boolean = false;
	export let hideSave: boolean = false;
	export let hideHelp: boolean = false;

	let signer: Signer;

	// Setting up context
	setContext(context_key, context_value);

	const dispatch = createEventDispatcher();

	function handleSave(event: any) {
		dispatch('saveEvent', event.detail);
	}

	function handleLoad(event: any) {
		dispatch('loadEvent', event.detail);
	}

	function handleExpand(event: any) {
		dispatch('expandEvent', event.detail);
	}

	function handleHelp(event: any) {
		dispatch('helpEvent', event.detail);
	}
</script>

<svelte:component
	this={Component}
	{deployers}
	{selectedDeployer}
	{raw}
	{expressionConfig}
	{signer}
	{loadRaw}
	{componentName}
	{hideLoad}
	{hideExpand}
	{hideSave}
	{hideHelp}
	on:save={handleSave}
	on:load={handleLoad}
	on:expand={handleExpand}
	on:help={handleHelp}
/>
