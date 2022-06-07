import { activateServer } from "./server"
import yn from "yn"

yn(process.env.SERVER, { default: true }) &&
	activateServer(process.env.PORT ? parseInt(process.env.PORT) : undefined)
