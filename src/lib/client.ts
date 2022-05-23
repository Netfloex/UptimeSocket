import { getConfig } from "@lib"
import axios from "axios"
import chalk from "chalk"
import { io } from "socket.io-client"

const log = (msg: unknown): void => console.log(chalk`[{yellow CLIENT}]`, msg)

export const activateClient = async (): Promise<void> => {
	const config = await getConfig()

	if (!config) return

	Object.entries(config).forEach(([server, { ntfy, name }]) => {
		const sendMessage = async ({
			title,
			body,
			tags,
		}: {
			title: string
			body: string
			tags: string
		}): Promise<void> => {
			await Promise.all(
				ntfy.map(async (ntfy) => {
					await axios.post(ntfy, body, {
						headers: {
							Title: title,
							Tags: tags,
							Priority: 4,
						},
					})
				}),
			)
		}
		const client = io(server)

		client.onAny((...data) => {
			log(data)
		})
		client.on("connect", async () => {
			log(chalk`Connected as ${client.id} to {dim ${server}}`)
			await sendMessage({
				title: `${name} is UP!`,
				body: "Connected successfully",
				tags: "tada,green_circle",
			})
		})

		client.on("disconnect", async (reason) => {
			log(chalk`Got disconnected from {dim ${server}}`)
			await sendMessage({
				title: `${name} is DOWN!`,
				body: reason,
				tags: "warning,red_circle",
			})
		})

		client.on("connect_error", (err) => {
			log(chalk`Could not connect to {dim ${server}}:`)
			if (err.message == "xhr poll error") {
				console.log("Server Uit")
				return
			}
			console.log(err)
		})
	})
}
