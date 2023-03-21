import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

/// @see https://codemirror.net/examples/styling/

/// The editor theme styles for Rain theme.
export const rainThemeStyle = (darkMode: boolean) => EditorView.theme({}, { dark: darkMode });

/// The highlighting style for code in the Rain theme.
export const rainThemeHighlightStyle = (darkMode: boolean) => {
	if (darkMode) {
		return HighlightStyle.define([
			{ tag: t.meta, color: '#404740' },
			{ tag: t.link, textDecoration: 'underline' },
			{ tag: t.heading, textDecoration: 'underline', fontWeight: 'bold' },
			{ tag: t.emphasis, fontStyle: 'italic' },
			{ tag: t.strong, fontWeight: 'bold' },
			{ tag: t.strikethrough, textDecoration: 'line-through' },
			{ tag: t.keyword, color: '#708' },
			{ tag: [t.atom, t.bool, t.url, t.contentSeparator, t.labelName], color: '#219' },
			{ tag: [t.literal, t.inserted], color: '#164' },
			{ tag: [t.string, t.deleted], color: '#a11' },
			{ tag: [t.regexp, t.escape, t.special(t.string)], color: '#e40' },
			{ tag: t.definition(t.variableName), color: '#00f' },
			{ tag: t.local(t.variableName), color: '#30a' },
			{ tag: [t.typeName, t.namespace], color: '#085' },
			{ tag: t.className, color: '#167' },
			{ tag: [t.special(t.variableName), t.macroName], color: '#256' },
			{ tag: t.definition(t.propertyName), color: '#00c' },
			{ tag: t.comment, color: '#940' },
			{ tag: t.invalid, color: '#f00' }
		]);
	} else {
		return HighlightStyle.define([
			{ tag: t.meta, color: '#404740' },
			{ tag: t.link, textDecoration: 'underline' },
			{ tag: t.heading, textDecoration: 'underline', fontWeight: 'bold' },
			{ tag: t.emphasis, fontStyle: 'italic' },
			{ tag: t.strong, fontWeight: 'bold' },
			{ tag: t.strikethrough, textDecoration: 'line-through' },
			{ tag: t.keyword, color: '#708' },
			{ tag: [t.atom, t.bool, t.url, t.contentSeparator, t.labelName], color: '#219' },
			{ tag: [t.literal, t.inserted], color: '#164' },
			{ tag: [t.string, t.deleted], color: '#a11' },
			{ tag: [t.regexp, t.escape, t.special(t.string)], color: '#e40' },
			{ tag: t.definition(t.variableName), color: '#00f' },
			{ tag: t.local(t.variableName), color: '#30a' },
			{ tag: [t.typeName, t.namespace], color: '#085' },
			{ tag: t.className, color: '#167' },
			{ tag: [t.special(t.variableName), t.macroName], color: '#256' },
			{ tag: t.definition(t.propertyName), color: '#00c' },
			{ tag: t.comment, color: '#940' },
			{ tag: t.invalid, color: '#f00' }
		]);
	}
};

/// Extension to enable the Rain theme (both the editor theme and
/// the highlight style).
export const rainTheme: (darkMode: boolean) => Extension[] = (darkMode = false) => [
	rainThemeStyle(darkMode),
	syntaxHighlighting(rainThemeHighlightStyle(darkMode))
];
