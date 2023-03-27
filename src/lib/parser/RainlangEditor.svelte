<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { writable, type Writable } from 'svelte/store';
	import { RainlangCodemirror } from '@rainprotocol/rainlang-codemirror';

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
	import { lightTheme } from './theme/light';
	import { darkTheme } from './theme/dark';
	import type { ExpressionConfig } from '@rainprotocol/rainlang';

	const emptySc: ExpressionConfig = { sources: [], constants: [] };

	export let vmExpressionConfig: Writable<ExpressionConfig> = writable(emptySc);
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
	export let minHeight: string = '0px';
	export let opmeta: string;

	const rainlangCodemirror = new RainlangCodemirror(opmeta);

	$: opmeta && rainlangCodemirror.updateOpMeta(opmeta);

	$: raw && onRawChange();

	const onRawChange = () => {
		const _config = rainlangCodemirror.getRainDocument()?.getExpressionConfig();
		console.log({ _config });
		if (_config) vmExpressionConfig.set(_config);
	};

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
		theme={dark ? darkTheme : lightTheme}
		styles={{
			'.cm-scroller': {
				overflow: 'auto',
				minHeight
			}
		}}
		basic={false}
		extensions={[
			...editingExtensions,
			...presentationExtensions,
			...inputHandlingExtensions,
			...languageExtensions,
			...primitivesExtensions,
			...rainlangCodemirror.extensions
		]}
	/>
</div>
