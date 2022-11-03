<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';

	export let id = '';

	const navigateToAnchor = () => {
		const location = window.location;
		window.location.replace(`${location.origin}${location.pathname}#${id}`);
	};
</script>

<div class="flex items-center gap-x-1 pt-6 border-t border-gray-200 mt-6">
	<span {id} class="text-2xl dark:text-gray-100"><slot /></span>
	{#if id !== ''}
		<div
			class="w-4 text-gray-400 cursor-pointer"
			on:click={navigateToAnchor}
			on:keydown={navigateToAnchor}
		>
			<Icon src={Link} />
		</div>
	{/if}
</div>
