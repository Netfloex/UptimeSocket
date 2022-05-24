import { join, resolve } from "path"

const r = (env: string | undefined, or: string): string =>
	env ? resolve(env) : or

const joinCwd = (...paths: string[]): string => join(process.cwd(), ...paths)

export const htmlPath = r(
	process.env.HTML_PATH,
	joinCwd("src", "static", "index.html"),
)

export const configPath = r(
	process.env.CONFIG_PATH,
	joinCwd("config", "config.yaml"),
)
