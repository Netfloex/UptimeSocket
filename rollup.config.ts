import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { pathExistsSync } from "fs-extra"
import { join } from "path"
import { defineConfig } from "rollup"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createConfigFor = (packageName) => {
	const packageRoot = join(process.cwd(), "packages", packageName)

	const tsconfig = join(packageRoot, "tsconfig.json")

	;[tsconfig, packageRoot].forEach((path) => {
		if (!pathExistsSync(path)) {
			console.log(path + " could not be found.")
		}
	})
	return defineConfig({
		input: join(packageRoot, "index.ts"),
		output: {
			dir: join(process.cwd(), "dist", `${packageName}`),
			format: "cjs",
			generatedCode: "es5",
			plugins: [terser()],
		},
		plugins: [
			nodeResolve({ preferBuiltins: true }),
			json(),
			typescript({ tsconfig }),
			commonjs(),
		],
	})
}

export default defineConfig([
	createConfigFor("server"),
	createConfigFor("client"),
])
