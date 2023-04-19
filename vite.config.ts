import { sveltekit } from '@sveltejs/kit/vite';
import { searchForWorkspaceRoot, type UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		globals: true,
		environment: 'jsdom',
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())]
		}
	},
};

export default config;
