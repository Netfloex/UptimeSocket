import { settings } from "@utils"
import chalk from "chalk"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const log = (msg: unknown): void => console.log(chalk`[{blue SERVER}]`, msg)

export const activateServer = (port = 3000): void => {
	const app = express()
	const http = createServer(app)
	const server = new Server(http, { cors: { origin: "*" } })
	http.listen(port)
	app.use(express.static(settings.staticPath))

	log("Starting...")
	log(chalk`Listening on port {bold ${port}}`)

	server.on("connection", (socket) => {
		log(chalk`A client connected {dim ${socket.id}}`)
		socket.on("disconnect", () => {
			log(chalk`Disconnected {dim ${socket.id}}`)
		})
	})
}
