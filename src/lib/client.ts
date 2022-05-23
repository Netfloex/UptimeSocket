import { getConfig } from "@lib"
import { NotificationArgs, sendMessage } from "@utils"
import chalk from "chalk"
import { io } from "socket.io-client"

const log = (msg: unknown): void => console.log(chalk`[{yellow CLIENT}]`, msg)

export const activateClient = async (): Promise<void> => {
	log("Starting...")

	const config = await getConfig()

	if (!config) return

	Object.entries(config).forEach(([server, { ntfy, name }]) => {
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
		const client = io(server)

		client.on("connect", async () => {
			log(chalk`Connected as {dim ${client.id}} to {dim ${server}}`)
			await sendNtfysMessage({
				title: `${name} is UP!`,
				body: "Connected successfully",
				tags: "tada,green_circle",
			})
		})

		client.on("disconnect", async (reason) => {
			log(chalk`Got disconnected from {dim ${server}}`)
			await sendNtfysMessage({
				title: `${name} is DOWN!`,
				body: reason,
				tags: "warning,red_circle",
			})
		})

		client.on("connect_error", (err) => {
			log(chalk`Could not connect to {dim ${server}}:`)
			if (err.message == "xhr poll error") {
				log("Could not reconnect")
				return
			}
			console.log(err)
		})
	})
}
