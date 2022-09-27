import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		assetsInlineLimit: 0,
	},
	base: '/reversi/',
});
