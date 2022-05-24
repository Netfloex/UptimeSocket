import { activateServer } from "./server"

activateServer(process.env.PORT ? parseInt(process.env.PORT) : undefined)
