<script lang="ts">
	type Item = {
		label: string;
		value?: any;
	};

	export let items: Item[] = [];
	export let value: any = -1;

	export let small: boolean = false;
	export let label: string = 'Select';

	export let disabled = false;

	export const validate = () => {
		return {
			ok: true,
			value
		};
	};
</script>

<div class={`w-full`}>
	<select
		{disabled}
		bind:value
		on:change
		class={`default ${small ? 'small' : 'large'}`}
		class:disabled
	>
		<option value={-1} hidden selected>{label}</option>
		{#each items as item, i}
			<option value={item?.value || i}>{item.label}</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	.default {
		@apply w-full text-neutral-600 border border-neutral-100 bg-white rounded-md;
	}

	.small {
		@apply px-0 py-1 text-xs;
	}

	.large {
		@apply px-4 py-2;
	}

	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
