<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { writable, type Writable } from 'svelte/store';
	import { RainlangExtension } from '@rainprotocol/rainlang-codemirror';

	import type { Extension } from '@codemirror/state';

	import {
		autocompletion,
		closeBrackets,
		closeBracketsKeymap,
		completionKeymap
	} from '@codemirror/autocomplete';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
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

	const emptySc: Writable<ExpressionConfig> = writable({ sources: [], constants: [] });

	export let expressionConfig: ExpressionConfig | null = emptySc;
	export let raw: string | null = `_: add(1 2);`;
	export let error: string = ''; // TODO: list of errors
	export let readOnly = false;
	export let editable = true;
	export let dark = false;
	export let minHeight: string = '0px';
	export let opMeta: string;

	const rainlangCodemirror = new RainlangExtension({
		hover: false,
		completion: false,
		initialOpMeta: opMeta
	});

	$: opMeta && rainlangCodemirror.updateOpMeta(opMeta);

	$: raw && onRawChange();

	const onRawChange = () => {
		// vmExpressionConfig.set();
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
	const editingExtension: Extension[] = [whitespace, editingHelpers];

	/// Presentation
	const styling: Extension[] = [];
	const presentationFeatures: Extension[] = [highlightSpecialChars()];
	const gutters: Extension[] = [highlightActiveLineGutter(), lineNumbers()];
	const tooltips: Extension[] = [];
	const presentationExtension: Extension[] = [gutters, presentationFeatures, styling, tooltips];

	/// Input Handling
	const keymapsExtension: Extension = keymap.of([
		...closeBracketsKeymap,
		...completionKeymap,
		...defaultKeymap,
		...historyKeymap,
		...searchKeymap
	]);
	const inputHandlingExtension: Extension[] = [keymapsExtension];

	/// Language
	const languageExtension: Extension[] = [
		syntaxHighlighting(defaultHighlightStyle, { fallback: true })
	];

	/// Primitives
	const transactions: Extension[] = [];
	const primitivesExtension: Extension[] = [transactions];
</script>

<div class="h-full flex-grow">
	<CodeMirror
		bind:value={raw}
		placeholder={'Write a Rainlang expression'}
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
			editingExtension,
			presentationExtension,
			inputHandlingExtension,
			languageExtension,
			primitivesExtension,
			rainlangCodemirror.extension
		]}
	/>
</div>
