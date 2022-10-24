<script lang="ts">
	import AutoAbiFormComponent from '$lib/auto-abi-form/AutoAbiFormComponent.svelte';
	import type { Abi } from 'abitype';

	export let abi: Abi;
	export let methodName: string = 'createChildTyped';
	export let result: any = {};

	$: method = abi.find((method) => method.type == 'function' && method?.name == methodName);
	$: inputs = method?.type == 'function' ? method.inputs : null;
</script>

{#if inputs}
	{#each inputs as component}
		<div class="flex flex-col gap-y-4">
			<AutoAbiFormComponent {component} bind:result />
		</div>
	{/each}
{/if}
