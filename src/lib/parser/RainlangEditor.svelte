<script lang="ts">
	import { javascript } from '@codemirror/lang-javascript';
	import type { StateConfig } from 'rain-sdk';
	import CodeMirror from 'svelte-codemirror-editor';
	import { writable, type Writable } from 'svelte/store';

	import {
		lineNumbers,
		highlightActiveLineGutter,
		highlightSpecialChars,
		drawSelection,
		dropCursor,
		rectangularSelection,
		crosshairCursor,
		highlightActiveLine,
		keymap
	} from '@codemirror/view';
	export { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import {
		foldGutter,
		codeFolding,
		indentOnInput,
		syntaxHighlighting,
		defaultHighlightStyle,
		bracketMatching,
		foldKeymap
	} from '@codemirror/language';
	import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
	import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
	import {
		closeBrackets,
		autocompletion,
		closeBracketsKeymap,
		completionKeymap
	} from '@codemirror/autocomplete';
	import { lintKeymap } from '@codemirror/lint';
	import { minimalSetup } from 'codemirror';

	const emptySc = { sources: [], constants: [] };

	export let vmStateConfig: Writable<StateConfig> = writable(emptySc);
	export let raw: string = `const foo = () => {
  return {
    foo: "bar",
    baz: 123
  }
};
`;
	export let error: string = '';
	export let readOnly = false;
	export let editable = true;

	// @see https://codemirror.net/docs/extensions/

	// Editing
	const whitespace = [indentOnInput()];
	const editingHelpers = [
		drawSelection(),
		autocompletion(),
		closeBrackets(),
		// codeFolding(),
		history()
	];
	const editingExtensions = [...whitespace, ...editingHelpers];

	// Presentation
	const styling = [];
	const presentationFeatures = [];
	const gutters = [
		lineNumbers(),
		// foldGutter(),
		highlightActiveLineGutter()
	];
	const tooltips = [];
	const presentationExtensions = [...styling, ...presentationFeatures, ...gutters, ...tooltips];

	// Input Handling
	const keymapsExtension = keymap.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
		...completionKeymap,
		...lintKeymap
	]);
	const inputHandlingExtensions = [keymapsExtension];

	// Language
	const languageExtensions = [];

	// Primitives
	const transactions = [];
	const primitivesExtensions = [...transactions];

	// Extension Bundles
	const extensionBundle = minimalSetup;
</script>

<div class="h-full flex-grow">
	<CodeMirror
		bind:value={raw}
		basic={false}
		lang={javascript()}
		readonly={readOnly}
		{editable}
		extensions={[
			...editingExtensions,
			...presentationExtensions,
			...inputHandlingExtensions,
			...languageExtensions,
			...primitivesExtensions,
			extensionBundle
		]}
	/>
</div>
