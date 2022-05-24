import preact from "@preact/preset-vite"
import alias from "@rollup/plugin-alias"
import { join } from "path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		preact(),
		tsconfigPaths(),
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
	build: {
		outDir: join(process.cwd(), "..", "..", "dist", "static"),
	},
})
