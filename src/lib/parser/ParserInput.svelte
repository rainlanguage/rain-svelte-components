<svelte:options accessors={true} />

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import AutocompleteList from './AutocompleteList.svelte';
	// import { OpMeta } from '$components/parser/opmeta';
	import { Parser, OpMeta, type StateConfig } from 'rain-sdk';
	import { tick } from 'svelte';
	import IgnoredText from './nodes/IgnoredText.svelte';
	import Op from './nodes/Op.svelte';
	import UnknownOp from './nodes/UnknownOp.svelte';
	import Param from './nodes/Param.svelte';

	export let vmStateConfig: Writable<StateConfig>;
	export let raw: string = '';
	export let error: string = '';

	let node: HTMLDivElement;

	const placeholderText = '<span style="color:gray;">Write your expression</span>';

	let autocompleteSelection: Selection | null;

	let _textSegments;

	export const loadRaw = (raw: string) => {
		node.innerHTML = raw;
		updateEditor();
	};

	const editorFocus = () => {
		if (node.innerHTML == placeholderText) node.innerHTML = '';
	};

	const autocomplete = async () => {
		autocompleteSelection = null;
		await tick();
		var selectedNode = document.getSelection();
		const type =
			selectedNode.anchorNode.parentElement.previousElementSibling?.attributes?.['data-type']
				?.nodeValue;
		if (type == 'unknown-op' && selectedNode.anchorOffset == selectedNode.anchorNode.length) {
			autocompleteSelection = selectedNode;
		}
	};

	const getTextSegments = (element: ChildNode) => {
		const textSegments: any[] = [];
		Array.from(element.childNodes).forEach((node) => {
			switch (node.nodeType) {
				case Node.TEXT_NODE:
					textSegments.push({ text: node.nodeValue, node });
					break;

				case Node.ELEMENT_NODE:
					textSegments.splice(textSegments.length, 0, ...getTextSegments(node));
					break;

				case Node.COMMENT_NODE:
					break;

				default:
					throw new Error(`Unexpected node type: ${node.nodeType}`);
			}
		});
		return textSegments;
	};

	const updateEditor = () => {
		const sel = window.getSelection() as Selection;
		const textSegments = getTextSegments(node);
		const textContent = textSegments.map(({ text }) => text).join('');
		raw = textContent;
		let anchorIndex: number = 0;
		let focusIndex: number = 0;
		let currentIndex = 0;
		textSegments.forEach(({ text, node }) => {
			if (node === sel.anchorNode) {
				anchorIndex = currentIndex + sel.anchorOffset;
			}
			if (node === sel.focusNode) {
				focusIndex = currentIndex + sel.focusOffset;
			}
			currentIndex += text.length;
		});
		if (textContent !== '') {
			renderText(textContent);
		} else {
			node.innerHTML = '';
		}
		restoreSelection(anchorIndex, focusIndex);
		autocomplete();
	};

	const restoreSelection = (absoluteAnchorIndex: number, absoluteFocusIndex: number) => {
		const sel = window.getSelection() as Selection;
		const textSegments = getTextSegments(node);
		let anchorNode = node;
		let anchorIndex = 0;
		let focusNode = node;
		let focusIndex = 0;
		let currentIndex = 0;
		textSegments.forEach(({ text, node }) => {
			const startIndexOfNode = currentIndex;
			const endIndexOfNode = startIndexOfNode + text.length;
			if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
				anchorNode = node;
				anchorIndex = absoluteAnchorIndex - startIndexOfNode;
			}
			if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
				focusNode = node;
				focusIndex = absoluteFocusIndex - startIndexOfNode;
			}
			currentIndex += text.length;
		});

		sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
	};

	const renderText = (text: string) => {
		const parsedResult = Parser.getParseTree(text, OpMeta);
		$vmStateConfig = Parser.getStateConfig(text, OpMeta);
		const tree = parsedResult[0].tree;
		error = tree?.[0]?.error || '';
		if (!tree.length) return text;
		let lastIndex = 0;
		let textSegments = [];

		const explode = (el) => {
			if (el?.opcode) {
				textSegments.push({
					text: text.slice(lastIndex, el?.opcode.position[0]),
					node: null,
					type: 'ignored'
				});
				textSegments.push({
					text: text.slice(el?.opcode.position[0], el?.opcode.position[1] + 1),
					node: el,
					type: 'op'
				});
				lastIndex = el?.opcode.position[1] + 1;
			} else if (el.value) {
				textSegments.push({
					text: text.slice(lastIndex, el?.position[0]),
					node: null,
					type: 'ignored'
				});
				textSegments.push({
					text: text.slice(el?.position[0], el?.position[1] + 1),
					node: el,
					type: 'param'
				});
				lastIndex = el?.position[1] + 1;
			} else if (el?.error && el.error.startsWith('unknown')) {
				if (lastIndex !== el?.position[0]) {
					textSegments.push({
						text: text.slice(lastIndex, el?.position[0]),
						node: null,
						type: 'ignored'
					});
				}
				textSegments.push({
					text: text.slice(el?.position[0], el?.position[1] + 1),
					node: el,
					type: 'unknown-op'
				});
				lastIndex = el?.position[1] + 1;
			} else {
				textSegments.push({
					text: text.slice(lastIndex, el?.position[1] + 1),
					node: null,
					type: 'ignored'
				});
				lastIndex = el?.position[1] + 1;
			}
			if (el?.parameters) {
				el?.parameters.forEach(explode);
			}
		};

		tree.forEach(explode);
		textSegments.push({ text: text.slice(lastIndex), node: null, type: 'ignored' });
		_textSegments = textSegments;

		node.innerHTML = '';
		textSegments.forEach((segment, i) => {
			switch (segment.type) {
				case 'ignored':
					new IgnoredText({
						target: node,
						props: { i, segment }
					});
					break;

				case 'op':
					new Op({
						target: node,
						props: { i, segment }
					});
					break;

				case 'unknown-op':
					new UnknownOp({
						target: node,
						props: { i, segment }
					});
					break;

				case 'param':
					new Param({
						target: node,
						props: { i, segment }
					});
					break;
			}
		});
	};

	const onPaste = (event) => {
		event.preventDefault();
		let paste = (event.clipboardData || window.clipboardData).getData('text');
		insertTextAtCaret(paste);
		updateEditor();
	};

	const insertTextAtCaret = (text: string) => {
		var sel, range;
		if (window.getSelection) {
			sel = window.getSelection() as Selection;
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				const node = document.createTextNode(text);
				range.insertNode(node);
				sel.setBaseAndExtent(node, text.length, node, text.length);
			}
		}
	};

	const inputAction = (node: HTMLDivElement) => {
		node.addEventListener('paste', onPaste);
		node.addEventListener('input', updateEditor);
		node.addEventListener('focus', editorFocus);
	};
</script>

<div
	class="p-2 w-full font-mono h-full"
	use:inputAction
	bind:this={node}
	contenteditable="true"
	spellcheck="false"
>
	{@html placeholderText}
</div>

{#if autocompleteSelection}
	<AutocompleteList bind:autocompleteSelection {OpMeta} />
{/if}
