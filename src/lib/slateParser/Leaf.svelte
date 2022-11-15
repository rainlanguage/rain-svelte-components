<svelte:options immutable />

<script lang="ts" context="module">
	export interface IText extends Text {
		op?: boolean;
		value?: boolean;
		error?: boolean;
		tag?: boolean;
	}
</script>

<script lang="ts">
	import type { Text } from 'slate';

	export let leaf: IText;
</script>

<span
	data-slate-leaf="true"
	class:op={leaf.op}
	class:value={leaf.value}
	class:error={leaf.error}
	class:tag={leaf.tag}
>
	<slot />
</span>

<style lang="postcss">
	.op {
		@apply text-fuchsia-700;
	}
	.value {
		@apply text-green-700;
	}
	.error {
		@apply border-b border-red-700;
	}
	.tag {
		@apply bg-gray-400 text-white;
	}
</style>
