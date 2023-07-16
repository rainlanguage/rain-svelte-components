<script>
	import { goto } from '$app/navigation';
	const navigateToAnchor = () => {
		goto('/examples/tabs#external-references');
	};
</script>

<div>
	You have been redirected to the URL defined. Click
	<button class="here-button" on:click={navigateToAnchor}> here </button> to go back.
</div>

<style lang="postcss">
	.here-button {
		@apply underline underline-offset-2 hover:text-gray-500;
	}
</style>
