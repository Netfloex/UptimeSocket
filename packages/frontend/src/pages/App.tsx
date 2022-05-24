import { Dashboard } from "@components/Dashboard"
import { ZustandProvider } from "@components/ZustandProvider"
import type { FunctionComponent } from "preact"

export const App: FunctionComponent = () => {
	return (
		<ZustandProvider>
			<Dashboard />
		</ZustandProvider>
	)
}
