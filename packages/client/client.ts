import { getConfig } from "@lib"
import { formatMs, NotificationArgs, sendMessage } from "@utils"
import chalk from "chalk"
import { ntfyMinimum } from "lib/settings"
import { io } from "socket.io-client"

const log = (msg: unknown): void => console.log(chalk`[{yellow CLIENT}]`, msg)

export const activateClient = async (): Promise<void> => {
	log("Starting...")

	const config = await getConfig()

	if (!config) return

	Object.entries(config).forEach(([server, { ntfy, name }]) => {
		let downSince: number | false = false
		let messageSent = false
		const timeouts: NodeJS.Timeout[] = []

		const sendNtfysMessage = async (
			opts: Omit<NotificationArgs, "ntfy">,
		): Promise<void> => {
			await Promise.all(
				ntfy.map(async (ntfy) => {
					await sendMessage({
						...opts,
						ntfy,
					})
				}),
			)
		}
		const client = io(server, { transports: ["websocket", "polling"] })

		client.on("connect", async () => {
			log(chalk`Connected as {dim ${client.id}} to {dim ${server}}`)

			timeouts.forEach((timeout) => clearTimeout(timeout))
			timeouts.length = 0
			if (downSince !== false && messageSent) {
				log(chalk`<{green UP}> ${name}`)
				await sendNtfysMessage({
					title: `${name} is UP!`,
					body: `Connected successfully, server was down for ${formatMs(
						Date.now() - downSince,
					)}`,
					tags: "tada,green_circle",
				})
				downSince = false
				messageSent = false
			}
		})

		client.on("disconnect", async (reason) => {
			log(chalk`Got disconnected from {dim ${server}}`)

			downSince = Date.now()
			timeouts.push(
				setTimeout(async () => {
					if (client.disconnected) {
						log(chalk`<{red DOWN}> ${name}`)
						await sendNtfysMessage({
							title: `${name} is DOWN!`,
							body: reason,
							tags: "warning,red_circle",
						})
						messageSent = true
					}
				}, ntfyMinimum),
			)
		})

		client.on("connect_error", (err) => {
			log(chalk`Could not connect to {dim ${server}}:`)
			if (["xhr poll error", "websocket error"].includes(err.message)) {
				log(
					`Server is down${
						downSince !== false
							? ` for ${formatMs(Date.now() - downSince)}`
							: ""
					}`,
				)
				return
			}
			console.log(err)
		})
	})
}
