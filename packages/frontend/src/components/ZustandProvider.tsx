import { createStore, Provider } from "@hooks/useStore"
import type { FC } from "react"

export const ZustandProvider: FC = ({ children }) => {
	return <Provider createStore={createStore}>{children}</Provider>
}
