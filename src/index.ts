import { activateClient, activateServer } from "@lib"
import yn from "yn"

console.log("Started")
yn(process.env.SERVER, { default: true }) && activateServer()
yn(process.env.CLIENT, { default: true }) && activateClient()
