import { getConfig } from "@lib"
import axios from "axios"
import chalk from "chalk"
import { io } from "socket.io-client"

const log = (msg: unknown): void => console.log(chalk`[{yellow CLIENT}]`, msg)

export const activateClient = async (): Promise<void> => {
	const config = await getConfig()

	Object.entries(config).forEach(([server, { ntfy, name }]) => {
		const http = axios.create({ baseURL: ntfy })
		const client = io(server)

		client.onAny((...data) => {
			log(data)
		})
		client.on("connect", async () => {
			log(chalk`Connected as ${client.id} to {dim ${server}}`)
			await http.post("", "Connected successfully", {
				headers: {
					Title: `${name} is UP!`,
					Tags: "tada,green_circle",
					Priority: 4,
				},
			})
		})

		client.on("disconnect", async (reason) => {
			log(chalk`Got disconnected from {dim ${server}}`)
			await http.post("", reason, {
				headers: {
					Title: `${name} is DOWN!`,
					Tags: "warning,red_circle",
					Priority: 4,
				},
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
