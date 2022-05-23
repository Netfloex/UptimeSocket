import chalk from "chalk"
import { pathExists, readFile } from "fs-extra"
import { load } from "js-yaml"
import { join } from "path"
import { z } from "zod"

type Config = {
	[socket: string]: {
		name: string
		ntfy: string
	}
}

const NtfySchema = z.string()
const NtfyArraySchema = z.union([
	NtfySchema.transform((str) => [str]),
	NtfySchema.array(),
])

const Config = z.record(
	z.string(),
	NtfyArraySchema.transform((ntfy) => ({ name: null, ntfy })).or(
		z.object({
			name: z.string().optional(),
			ntfy: NtfyArraySchema,
		}),
	),
)
// .transform((record) =>
// 	Object.fromEntries(
// 		Object.entries(record).map(([socket, options]) =>
// 			typeof options == "string"
// 				? [
// 						socket,
// 						{
// 							name: socket,
// 							ntfy: [options],
// 						},
// 				  ]
// 				: [socket, options],
// 		),
// 	),
// )

type OutputConfig = z.output<typeof Config>

export const getConfig = async (): Promise<OutputConfig | false> => {
	const path = join(process.cwd(), "config", "config.yaml")
	if (await pathExists(path)) {
		const text = await readFile(path, "utf-8")
		const validated = Config.safeParse(load(text))
		if (validated.success) {
			return validated.data
		} else {
			console.log("Error Parsing Config")

			console.log(validated.error)
			return false
		}
	} else {
		console.log(chalk`Could not find config at {dim ${path}}`)
		return false
	}
}
