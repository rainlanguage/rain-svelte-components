<script lang="ts">
	type Item = {
		label: string;
		value?: any;
	};

	export let items: Item[] = [];
	export let value: any = -1;

	export let disabled = false;

	export const validate = () => {
		return {
			ok: true,
			value
		};
	};
</script>

<div class="flex w-full flex-col gap-y-2">
	<div class="self-start rounded-md border border-gray-500 text-white ">
		<select
			{disabled}
			bind:value
			on:change
			class="default text-light text-black dark:text-white"
			class:disabled
		>
			<option class="opacity-50" value={-1} hidden selected>Select</option>
			{#each items as item, i}
				<option class="text-black" value={item?.value || i}>{item.label}</option>
			{/each}
		</select>
	</div>
</div>

<style lang="postcss">
	.default {
		@apply outline-none mr-2 border-none bg-transparent px-4 py-2;
	}

	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
