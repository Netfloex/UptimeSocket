import chalk from "chalk"
import { Server } from "socket.io"

const log = (msg: unknown): void => console.log(chalk`[{blue SERVER}]`, msg)

export const server = new Server()
export const activateServer = (port = 3000): void => {
	log("Starting...")
	server.listen(port)
	log(chalk`Listening on port {bold ${port}}`)

	server.on("connection", (socket) => {
		log(chalk`A client connected {dim ${socket.id}}`)
		socket.on("disconnect", () => {
			log(chalk`Disconnected {dim ${socket.id}}`)
		})
	})
}
