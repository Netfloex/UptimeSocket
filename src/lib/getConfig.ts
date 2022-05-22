import { pathExists, readFile } from "fs-extra"
import { load } from "js-yaml"
import { join } from "path"

type Config = {
	[socket: string]: {
		name: string
		ntfy: string
	}
}

export const getConfig = async (): Promise<Config> => {
	const path = join(process.cwd(), "config", "config.yaml")
	if (await pathExists(path)) {
		const text = await readFile(path, "utf-8")
		return load(text) as Config
	} else {
		throw new Error("Could not find " + path)
	}
}
