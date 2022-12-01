<script lang="ts">
	import Leaf from './Leaf.svelte';
	import { Slate, withSvelte, Editable } from 'svelte-slate';
	import { createEditor, Node } from 'slate';
	import { Parser, rainterpreterOpMeta } from '@beehiveinnovation/rainlang';
	import { writable, type Writable } from 'svelte/store';
	import type { StateConfig } from '@beehiveinnovation/rainlang';
	import { deserialize, getFlatRanges, serialize } from '$lib/parser/parserHelpers';
	import { onMount } from 'svelte';

	const editor = withSvelte(createEditor());

	const emptySc = { sources: [], constants: [] };

	export let vmStateConfig: Writable<StateConfig> = writable(emptySc);
	export let raw: string = '';
	export let error: string = '';
	export let readOnly: boolean = false;

	let value = [
		{
			type: 'expression',
			children: [{ text: '' }]
		}
	];

	export const loadRaw = (raw: string) => {
		value = deserialize(raw);
	};

	if (raw !== '') loadRaw(raw);

	$: raw = serialize(value);

	$: $vmStateConfig = (() => {
		if (raw !== '') {
			const [tree, sc] = Parser.get(raw, rainterpreterOpMeta);
			error = tree?.[0]?.tree?.[0].error || '';
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

<div class="h-full flex-grow">
	<Slate {editor} bind:value>
		<Editable
			{Leaf}
			{readOnly}
			{decorate}
			spellcheck={false}
			placeholder="Write your expression..."
			style="height: 100%;"
		/>
	</Slate>
</div>
