
import styles from "./Notification.module.css"
import { useNotification } from "../../stores/notificationStore"


export default function Notification() {
	const notification = useNotification()
	return (
		<div 
			class={styles["notification"] + (notification.status === "closed" ? " " + styles["notification--hidden"] : "")}>
			<span class={styles["notification__text"]}>{notification.text}</span>
		</div>
	)
}