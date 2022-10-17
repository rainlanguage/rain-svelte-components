const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			...colors,
			gray: colors.neutral
		}
	},
	darkMode: 'class',

	plugins: []
};

module.exports = config;
