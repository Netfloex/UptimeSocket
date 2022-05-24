import { io, Socket } from "socket.io-client"
import create, { StoreApi, UseBoundStore } from "zustand"
import createContext from "zustand/context"

export interface Store {
	io: Socket
}

export const { Provider, useStore } = createContext<StoreApi<Store>>()

export const createStore = (): UseBoundStore<StoreApi<Store>> =>
	create<Store>(() => ({
		io: io(
			import.meta.env.VITE_PORT
				? `${location.protocol}//${location.hostname}:${
						import.meta.env.VITE_PORT
				  }`
				: {},
		),
	}))
