import { activateClient } from "./client"
import yn from "yn"

yn(process.env.CLIENT, { default: true }) && activateClient()
