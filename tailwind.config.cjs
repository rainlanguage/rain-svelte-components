const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			...colors,
			gray: colors.neutral,
			rainprimary: '#B44346',
			rainsecondary: '#F1EFE9'
		},
		fontFamily: {
			sans: ['DM Sans', { fontFeatureSettings: '"calt", "off"' }],
			mono: 'DM Mono'
		}
	},
	darkMode: 'class',

	variants: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd']
};

module.exports = config;
