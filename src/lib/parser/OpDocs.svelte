<script lang="ts">
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';

	export let opMeta;

	let ops: any[] = [];
	let opsSearch: any[] = [];
	let categories: string[] = [];
	let searchStr: string = '';
	let active: number = -1;

	$: if (searchStr) {
		const str = searchStr.toLowerCase();
		opsSearch = ops.filter(
			(op) =>
				op.name.toLowerCase().includes(str) ||
				op?.aliases?.filter((alias: string) => alias.toLowerCase().includes(str)).length
		);
		getCategories();
	} else {
		opsSearch = ops;
		getCategories();
	}

	const getCategories = () => {
		let categorySet = new Set();
		Array.from(opsSearch).forEach((op) => {
			categorySet.add(op.data.category);
		});
		categories = Array.from(categorySet);
	};

	onMount(() => {
		ops = opMeta;
		opsSearch = ops;
		getCategories();
	});
</script>

<div class="flex flex-col h-full dark:bg-black">
	<div class="bg-transparent p-2 w-full flex items-center gap-x-2">
		<div class="text-gray-600 w-4 h-4 font-thin">
			<Icon src={MagnifyingGlass} />
		</div>
		<input
			class="w-full outline-0 dark:bg-transparent"
			bind:value={searchStr}
			type="text"
			placeholder="Search"
		/>
	</div>
	<div
		class="flex flex-col text-sm overflow-scroll relative h-full text-gray-700 dark:text-gray-200"
	>
		{#each categories as category}
			<span
				class="bg-white text-gray-500 dark:bg-black py-1 uppercase px-2 text-xs sticky top-0 border-y border-gray-300"
			>
				{category}
			</span>
			<div class="flex flex-col">
				{#each opsSearch.filter((op) => category == op.data.category) as op}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class:activeOp={op.enum == active}
						class="flex flex-col"
						on:click={() => {
							active = op.enum == active ? -1 : op.enum;
						}}
					>
						<div
							class={`p-2 flex flex-col cursor-pointer dark:hover:bg-gray-900 transition-colors gap-y-1 ${
								op.enum == active ? 'bg-gray-100 dark:bg-gray-900' : 'hover:bg-gray-100'
							}`}
						>
							<span class="font-mono text-amber-700">
								{op.name.toLowerCase()}
							</span>
							<span class="">
								{op.description}
							</span>
						</div>
						{#if op.enum == active}
							<div
								class="p-2 flex flex-col gap-y-2 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700"
							>
								<span class="text-xs text-gray-500">EXAMPLE</span>
								<div class="pl-2">
									<span class="font-mono text-fuchsia-600 dark:text-fuchsia-500"
										>{op.data.example}</span
									>
								</div>
								{#if op.data.parameters.length}
									<span class="text-xs text-gray-500">PARAMETERS</span>
									{#each op.data.parameters as parameter}
										<div class="pl-2 flex flex-col items-start">
											<span class="font-mono bg-blue-100 dark:bg-blue-900 inline"
												>{parameter.name}</span
											>
											<span>{parameter.description}</span>
										</div>
									{/each}
								{/if}
								{#if op.aliases?.length}
									<span class="text-xs text-gray-500">ALIASES</span>
									<div class="pl-2 font-mono">
										{#each op.aliases as alias, i}
											<span class="bg-amber-100 dark:bg-amber-900">{alias.toLowerCase()}</span
											>{#if i + 1 !== op.aliases.length},&nbsp;{/if}
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
		{#if !categories.length}
			<span
				class="bg-white text-gray-500 dark:bg-black py-4 px-2 text-sm sticky top-0 border-t border-gray-300"
			>
				No results
			</span>
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.activeOp) {
		@apply bg-gray-100 dark:bg-gray-800;
	}
</style>
