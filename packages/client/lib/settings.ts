import { join, resolve } from "path"

const r = (env: string | undefined, or: string): string =>
	env ? resolve(env) : or

const joinCwd = (...paths: string[]): string => join(process.cwd(), ...paths)

export const configPath = r(
	process.env.CONFIG_PATH,
	joinCwd("config", "config.yaml"),
)
