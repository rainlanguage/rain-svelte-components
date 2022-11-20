<svelte:options immutable />

<script lang="ts" context="module">
	export interface IText extends Text {
		op?: boolean;
		value?: boolean;
		error?: boolean;
		tag?: boolean;
		name?: boolean;
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
	class:name={leaf.name}
	class:mono={!leaf?.placeholder}
>
	<slot />
</span>

<style global lang="postcss">
	:local(.op) {
		@apply text-fuchsia-700 dark:text-fuchsia-400;
	}
	:local(.value) {
		@apply text-green-700 dark:text-green-400;
	}
	:local(.error) {
		@apply border-b border-red-700;
	}
	:local(.tag),
	:local(.name) {
		@apply bg-gray-400  dark:bg-gray-300 text-white dark:text-gray-900 rounded-md px-0.5;
	}
	:local(.mono) {
		@apply font-mono;
	}
</style>
