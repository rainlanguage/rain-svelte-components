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
	import LeafTip from '$lib/parser/LeafTip.svelte';
	import type { Text } from 'slate';
	import type { SvelteComponent } from 'svelte';

	export let leaf: IText;
	let el: HTMLSpanElement;
	let tip: SvelteComponent;

	const show = () => {
		const message = leaf?.el?.error;
		if (message) {
			const rect = el.getBoundingClientRect();
			tip = new LeafTip({
				target: document.body,
				intro: true,
				props: {
					rect,
					message,
					type: 'error'
				}
			});
		}
	};

	const hide = () => {
		tip?.$destroy();
	};
</script>

<span
	bind:this={el}
	on:mouseenter={show}
	on:mouseleave={hide}
	data-slate-leaf="true"
	class:op={leaf.op}
	class:value={leaf.value}
	class:error={leaf.error || leaf?.el?.error}
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
		@apply text-amber-600 dark:text-amber-400;
	}
	:local(.value) {
		@apply text-blue-700 dark:text-blue-400;
	}
	:local(.error) {
		@apply border-b-2 border-red-500 border-dotted text-red-500;
	}
	:local(.comment) {
		@apply text-green-700 dark:text-green-400;
	}
	:local(.paren) {
		@apply text-purple-500 dark:text-purple-400;
	}
	:local(.tag),
	:local(.name) {
		@apply bg-gray-500  dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded-md px-0.5;
	}
	:local(.mono) {
		@apply font-mono;
	}
</style>
