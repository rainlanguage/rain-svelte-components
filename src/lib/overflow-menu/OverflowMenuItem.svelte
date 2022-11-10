<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';

	const { toggle } = getContext('overflow-menu') as { toggle: Function };
	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click');
		toggle();
	};
</script>

<div
	class="flex cursor-pointer flex-col items-start py-1 px-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 whitespace-nowrap rounded-md"
	on:click={handleClick}
>
	<slot />
</div>
