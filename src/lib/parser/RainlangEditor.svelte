<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { writable, type Writable } from 'svelte/store';

	import type { Extension } from '@codemirror/state';

	import {
		autocompletion,
		closeBrackets,
		closeBracketsKeymap,
		completionKeymap
	} from '@codemirror/autocomplete';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
	import { searchKeymap } from '@codemirror/search';
	import {
		drawSelection,
		highlightActiveLineGutter,
		highlightSpecialChars,
		keymap,
		lineNumbers
	} from '@codemirror/view';
	import { rainTheme } from './theme/rain';

	const emptySc: ExpressionConfig = { sources: [], constants: [] };

	export let vmStateConfig: Writable<ExpressionConfig> = writable(emptySc);
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
	export let dark = false;

	$: raw && updateExpressionConfig();

	const updateExpressionConfig = () => {};

	/// @see https://codemirror.net/docs/extensions/

	/// Editing
	const whitespace: Extension[] = [indentOnInput()];
	const editingHelpers: Extension[] = [
		autocompletion(),
		closeBrackets(),
		drawSelection(),
		history()
	];
	const editingExtensions: Extension[] = [...whitespace, ...editingHelpers];

	/// Presentation
	const styling: Extension[] = [];
	const presentationFeatures: Extension[] = [highlightSpecialChars()];
	const gutters: Extension[] = [highlightActiveLineGutter(), lineNumbers()];
	const tooltips: Extension[] = [];
	const presentationExtensions: Extension[] = [
		...gutters,
		...presentationFeatures,
		...styling,
		...tooltips
	];

	/// Input Handling
	const keymapsExtension: Extension = keymap.of([
		...closeBracketsKeymap,
		...completionKeymap,
		...defaultKeymap,
		...historyKeymap,
		...searchKeymap
	]);
	const inputHandlingExtensions: Extension[] = [keymapsExtension];

	/// Language
	const languageExtensions: Extension[] = [
		syntaxHighlighting(defaultHighlightStyle, { fallback: true })
	];

	/// Primitives
	const transactions: Extension[] = [];
	const primitivesExtensions: Extension[] = [...transactions];
</script>

<div class="h-full flex-grow">
	<CodeMirror
		bind:value={raw}
		placeholder={'Write a Rainlang expression'}
		lang={javascript()}
		readonly={readOnly}
		{editable}
		theme={rainTheme(dark)}
		basic={false}
		extensions={[
			...editingExtensions,
			...presentationExtensions,
			...inputHandlingExtensions,
			...languageExtensions,
			...primitivesExtensions
		]}
	/>
</div>
