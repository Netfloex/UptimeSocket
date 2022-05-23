import axios from "axios"
import chalk from "chalk"

export interface NotificationArgs {
	ntfy: string
	title: string
	body: string
	tags: string
}

export const sendMessage = async ({
	ntfy,
	title,
	body,
	tags,
}: NotificationArgs): Promise<void> => {
	await axios
		.post<string | { topic: string; title: string }>(ntfy, body, {
			headers: {
				Title: title,
				Tags: tags,
				Priority: 4,
			},
		})
		.then((res) => {
			if (typeof res.data == "string") {
				console.log("Successfully sent message to " + ntfy)
			} else if (typeof res.data == "object") {
				if (res.data && res.data.topic && res.data.title) {
					console.log(
						chalk`[{green NTFY}] Successfully sent {dim ${res.data.title}} to topic {dim ${res.data.topic}}`,
					)
				}
			}
		})
}
