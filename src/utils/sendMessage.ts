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
		.then(() => {
			console.log(
				chalk`[{green NTFY}] Successfully sent {dim {bold ${title}}} {dim ${body}}`,
			)
		})
}
