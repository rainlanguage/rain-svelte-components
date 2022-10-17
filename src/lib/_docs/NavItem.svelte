<script lang="ts">
	import { page } from '$app/stores';
	export let link: string | null = null;
</script>

{#if link}
	<a class="py-1 px-4" href={link} class:active={$page.url.pathname == link}><slot /></a>
{:else}
	<span class="py-1 px-4"><slot /></span>
{/if}

<style lang="postcss">
	.active {
		@apply border-l-4 border-gray-600 box-content;
	}
</style>
