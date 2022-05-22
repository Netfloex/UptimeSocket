import chalk from "chalk"
import { Server } from "socket.io"

const log = (msg: unknown): void => console.log(chalk`[{blue SERVER}]`, msg)

export const server = new Server({})
export const activateServer = (port = 3000): void => {
	log(chalk`Listening on port {bold ${port}}`)
	server.listen(port)

	server.on("connection", (socket) => {
		log(`Connected ${socket.id}`)
		socket.on("disconnect", () => {
			log(`Disconnected ${socket.id}`)
		})
	})
}
