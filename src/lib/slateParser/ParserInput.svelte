<script lang="ts">
	import Leaf from './Leaf.svelte';
	import { Slate, Editable, withSvelte } from 'svelte-slate';
	import { createEditor, Transforms, Editor, Node, Text } from 'slate';
	import { Parser, rainterpreterOpMeta } from '@beehiveinnovation/rainlang';
	import { writable, type Writable } from 'svelte/store';
	import type { StateConfig } from '@beehiveinnovation/rainlang';
	import Button from '$lib/Button.svelte';
	import { getFlatRanges } from '$lib/slateParser/parserHelpers';

	const editor = withSvelte(createEditor());

	export let vmStateConfig: Writable<StateConfig> = writable({ sources: [], constants: [] });
	export let raw: string;

	let value = [
		{
			type: 'expression',
			children: [{ text: 'This is editable ' }]
		}
	];

	const decorate = ([node, path]) => {
		const ranges = getFlatRanges(value);

		if (node.type == 'expression') {
			const prevSiblingsOffset = value
				.slice(0, path[0])
				.map((node) => Node.string(node).length)
				.reduce((a, b) => a + b, 0);

			return ranges
				.map((range) => {
					range.anchor.offset = range.anchor.offset - prevSiblingsOffset;
					range.focus.offset = range.focus.offset - prevSiblingsOffset;
					return range;
				})
				.filter((range) => range.focus.offset > 0);
		}
		return [];
	};
</script>

<Slate {editor} bind:value>
	<Editable {Leaf} {decorate} spellcheck={false} placeholder="Enter some plain text..." />
</Slate>
