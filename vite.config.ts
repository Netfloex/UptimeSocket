import preact from "@preact/preset-vite"
import alias from "@rollup/plugin-alias"
import { join } from "path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		tsconfigPaths({ root: process.cwd() }),
		alias({
			entries: [
				{ find: "react", replacement: "preact/compat" },
				{
					find: "react-dom/test-utils",
					replacement: "preact/test-utils",
				},
				{ find: "react-dom", replacement: "preact/compat" },
				{
					find: "react/jsx-runtime",
					replacement: "preact/jsx-runtime",
				},
			],
		}),
	],
	root: join(process.cwd(), "src", "static"),
	build: {
		outDir: join(process.cwd(), "dist", "static"),
		rollupOptions: {
			input: {
				main: join(process.cwd(), "src", "static", "index.html"),
			},
		},
	},
})
