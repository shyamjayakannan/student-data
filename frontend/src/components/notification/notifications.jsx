"use clent";

import { useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import Notification from "./notification";

export default function Notifications() {
    const notificationCtx = useContext(NotificationContext);

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "absolute", margin: "auto", height: "100%", paddingTop: "50px", zIndex: "100" }}>
                {notificationCtx.messages.map(message => <Notification {...message} key={message.id} />)}
            </div>
        </div>
    );
}