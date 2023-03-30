<script lang="ts">
	import { darkMode } from '$lib/darkModeAction';
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
	import { rlc, type ExpressionConfig, type RDProblem } from '@rainprotocol/rainlang';
	import { RainlangExtension } from '@rainprotocol/rainlang-codemirror';
	import CodeMirror from 'svelte-codemirror-editor';
	import { writable, type Writable } from 'svelte/store';
	import { darkTheme } from './theme/dark';
	import { lightTheme } from './theme/light';

	const emptySc: ExpressionConfig = { sources: [], constants: [] };

	export let expressionConfig: Writable<ExpressionConfig> = writable(emptySc);
	export let raw: string;
	export let errors: RDProblem[] = [];
	export let readOnly = false;
	export let opMeta: string;

	const rainlangCodemirror = new RainlangExtension({
		hover: false,
		completion: false,
		initialOpMeta: opMeta
	});

	$: opMeta && rainlangCodemirror.updateOpMeta(opMeta);

	$: raw && compileDocument();

	interface RainCompilerError {
		problems: RDProblem[];
		runtimeError: Error | undefined;
	}

	const compileDocument = async () => {
		try {
			const compiledDocument = await rlc(raw, opMeta);
			expressionConfig.set(compiledDocument);
			errors = [];

			console.log({ compiledDocument });
		} catch (e) {
			const error = e as RainCompilerError;
			errors = error.problems;
			if (error.runtimeError) {
				throw error.runtimeError;
			}
		}
	};

	/// @see https://codemirror.net/docs/extensions/ for the full list of extensions maintained by CodeMirror

	/// Editing
	const whitespace = [indentOnInput()];
	const editingHelpers = [autocompletion(), closeBrackets(), drawSelection(), history()];
	const editingExtension = [whitespace, editingHelpers];

	/// Presentation
	// const styling = [];
	const presentationFeatures = [highlightSpecialChars()];
	const gutters = [highlightActiveLineGutter(), lineNumbers()];
	// const tooltips = [];
	const presentationExtension = [gutters, presentationFeatures];

	/// Input Handling
	const keymapsExtension = keymap.of([
		...closeBracketsKeymap,
		...completionKeymap,
		...defaultKeymap,
		...historyKeymap,
		...searchKeymap
	]);
	const inputHandlingExtension = [keymapsExtension];

	/// Language
	const languageExtension = [syntaxHighlighting(defaultHighlightStyle, { fallback: true })];

	/// Primitives
	// const transactions = [];
	// const primitivesExtension = [];
</script>

<div class="h-full flex-grow">
	<CodeMirror
		bind:value={raw}
		placeholder={'Write your expression...'}
		readonly={readOnly}
		editable={!readOnly}
		theme={$darkMode ? darkTheme : lightTheme}
		styles={{
			'&': {
				flexGrow: 1,
				height: '100%'
			}
		}}
		basic={false}
		extensions={[
			editingExtension,
			presentationExtension,
			inputHandlingExtension,
			languageExtension,
			// primitivesExtension,
			rainlangCodemirror.extension
		]}
	/>
</div>

<style lang="postcss" global>
	.codemirror-wrapper {
		display: flex;
		height: 100%;
	}
</style>
