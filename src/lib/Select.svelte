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

	const isOpened = () => {
		opened = !opened;
	}

	$: opened = false;
</script>

	<div class={`w-full`}>
		<select
			{disabled}
			bind:value
			on:change
			on:click={isOpened}
			on:blur={isOpened}
			class={`default  ${opened ? "border-neutral-300 bg-white rounded-t-lg" : "border-neutral-100 bg-neutral-100 rounded-md" }`}
			class:disabled
		>
			<option value={-1} hidden selected>Select</option>
			{#each items as item, i}
				<option value={item?.value || i}>{item.label}</option>
			{/each}
		</select>
	</div>

<style lang="postcss">
	.default {
		@apply w-full px-4 py-2 text-neutral-600 border;
	}

	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
