<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import type { Abi } from 'abitype';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;

	$: console.log(method);
</script>

{#if inputs}
	{#each inputs as component}
		<AutoAbiFormComponent {component} />
	{/each}
{/if}
