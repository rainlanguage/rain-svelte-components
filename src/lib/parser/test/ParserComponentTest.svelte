<script lang="ts">
	import { setContext } from 'svelte';
	import type { Deployer } from '$lib/parser/types';

	export let Component;
	export let context_key;
	export let context_value;
    export let deployers: Deployer[] = [];
	setContext(context_key, context_value);
</script>

<svelte:component this={Component} {deployers}/>