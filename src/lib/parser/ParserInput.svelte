<script lang="ts">
	import Leaf from './Leaf.svelte';
	import { Slate, withSvelte, Editable } from 'svelte-slate';
	import { createEditor, Node } from 'slate';
	import { Parser, rainterpreterOpMeta } from '@rainprotocol/rainlang';
	import { writable, type Writable } from 'svelte/store';
	import type { StateConfig } from '@rainprotocol/rainlang';
	import { deserialize, getFlatRanges, serialize } from '$lib/parser/parserHelpers';
	import type { ParseTree } from 'rain-sdk';

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

	const updateStateConfig = (text: string, tree: ParseTree, stateConfig: StateConfig) => {
		if (text !== '') {
			error = tree?.[0]?.tree?.[0]?.error || '';
			if (!error) return stateConfig;
			else return emptySc;
		} else return emptySc;
	};

	let textCache: any = null;
	let parseTreeCache: any = null;

	const parse = (value: Node[]) => {
		const text = serialize(value);
		let tree, stateConfig;
		try {
			if (text == textCache) {
				tree = parseTreeCache;
				// console.log(tree);
			} else {
				[tree, stateConfig] = Parser.get(text, rainterpreterOpMeta);
				// console.log(tree);
				$vmStateConfig = updateStateConfig(text, tree, stateConfig);
				parseTreeCache = tree;
				textCache = text;
			}
		} catch {
			return;
		} finally {
			return tree;
		}
	};

	const decorate = ([node, path]: any) => {
		if (node.type == 'expression') {
			const tree = parse(value);
			if (!tree) return [];
			const ranges = getFlatRanges(tree);
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
