import { activateClient, activateServer } from "@lib"
import yn from "yn"

console.log("Started")
yn(process.env.SERVER, { default: true })
	? activateServer()
	: console.log("Server is disabled.")
yn(process.env.CLIENT, { default: true })
	? activateClient()
	: console.log("Client is disabled.")
