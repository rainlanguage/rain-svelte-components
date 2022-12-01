<svelte:options immutable />

<script lang="ts" context="module">
	export interface IText extends Text {
		op?: boolean;
		value?: boolean;
		error?: boolean;
		tag?: boolean;
		name?: boolean;
		comment?: boolean;
		paren?: boolean;
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
	class:comment={leaf.comment}
	class:paren={leaf.paren}
>
	<slot />
</span>

<style global lang="postcss">
	:local(.op) {
		@apply text-amber-700 dark:text-amber-400;
	}
	:local(.value) {
		@apply text-blue-700 dark:text-blue-400;
	}
	:local(.error) {
		@apply border-b border-red-700;
	}
	:local(.comment) {
		@apply text-green-700 dark:text-green-400;
	}
	:local(.paren) {
		@apply text-fuchsia-500 dark:text-fuchsia-400;
	}
	:local(.tag),
	:local(.name) {
		@apply bg-gray-500  dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded-md px-0.5;
	}
	:local(.mono) {
		@apply font-mono;
	}
</style>
