<script lang="ts">
	export let color: string = "gray";
	export let items: any[];
	export let selectedIndex = 0;

	const filterSelection = (e: any) => selected = e.target.dataset.name;
	export let selected = items[selectedIndex];

	// TODO: Filter the objects? 
</script>

	<div class={`container`}>
		{#each items as item}
			<button class:active={selected === item} 
					class="normal" 
					data-name={item} 
					on:click={filterSelection}>
				{item}
			</button>
		{/each}
	</div>

<style lang="postcss">
	.normal {
		@apply text-neutral-600 font-bold px-2.5 py-1.5;
	}

	.active {
		@apply bg-white text-black rounded-xl ;
	}
	.container {
		@apply flex bg-zinc-200 w-max rounded-3xl px-3 py-2 space-x-0.5;
	}
</style>
