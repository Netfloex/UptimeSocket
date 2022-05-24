import { humanizer } from "humanize-duration"

export const formatMs = humanizer({
	round: true,
	conjunction: " and ",
})
