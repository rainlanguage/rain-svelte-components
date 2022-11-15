<script lang="ts">
	import Leaf from './Leaf.svelte';
	import { Slate, withSvelte, Editable } from 'svelte-slate';
	import { createEditor, Transforms, Editor, Node, Text } from 'slate';
	import { Parser, rainterpreterOpMeta } from '@beehiveinnovation/rainlang';
	import { writable, type Writable } from 'svelte/store';
	import type { StateConfig } from '@beehiveinnovation/rainlang';
	import { deserialize, getFlatRanges, serialize } from '$lib/parser/parserHelpers';

	const editor = withSvelte(createEditor());

	const emptySc = { sources: [], constants: [] };

	export let vmStateConfig: Writable<StateConfig> = writable(emptySc);
	export let raw: string;
	export let error: string;

	export const loadRaw = (raw: string) => {
		value = deserialize(raw);
	};

	let value = [
		{
			type: 'expression',
			children: [{ text: '' }]
		}
	];

	$: raw = serialize(value);

	$: $vmStateConfig = (() => {
		// console.log(raw, value);
		if (raw !== '') {
			const [tree, sc] = Parser.get(raw);
			// console.log(tree);
			const error = tree?.[0]?.error || '';
			if (!error) return sc;
			else return emptySc;
		} else return emptySc;
	})();

	const decorate = ([node, path]: any) => {
		if (node.type == 'expression') {
			const ranges = getFlatRanges(value);
			const prevSiblingsOffset = value
				.slice(0, path[0])
				.map((node) => Node.string(node).length)
				.reduce((a, b) => a + b, 0);
			const currentLength = Node.string(node).length;
			const finalRanges = ranges
				.map((range) => {
					range.anchor.offset = range.anchor.offset - prevSiblingsOffset;
					range.focus.offset = range.focus.offset - prevSiblingsOffset;
					return range;
				})
				.filter((range) => range.focus.offset > 0 && range.anchor.offset < currentLength);
			return finalRanges;
		}
		return [];
	};
</script>

<Slate {editor} bind:value>
	<Editable {Leaf} {decorate} spellcheck={false} placeholder="Write your expression..." />
</Slate>
