import create from "solid-zustand"

type NotificationStore = {
	status: "open" | "closed",
	text: string,
	showNotification: () => void,
	hideNotification: () => void,
	setText: (text: string) => void

}

export const useNotification = create<NotificationStore>((set) => ({
	status: "closed",
	text: "",
	showNotification: () => set(() => ({
		status: "open"
	})),
	hideNotification: () => set(() => ({
		status: "closed"
	})),
	setText: (text) => set(() => ({
		text: text
	}))
}))