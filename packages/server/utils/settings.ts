import { join, resolve } from "path"

const r = (env: string | undefined, or: string): string =>
	env ? resolve(env) : or

const joinCwd = (...paths: string[]): string => join(process.cwd(), ...paths)

export const staticPath = r(process.env.STATIC_PATH, joinCwd("dist", "static"))
