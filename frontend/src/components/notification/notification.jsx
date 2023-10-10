"use client";

import { useContext, useEffect, useRef, useState } from "react";
import classes from "../../styles/notification/notification.module.css";
import NotificationContext from "../../store/NotificationContext";

export default function Notification(props) {
    const notificationCtx = useContext(NotificationContext);
    const [exit, setExit] = useState(false);
    const timeout = useRef();

    useEffect(() => {
        timeout.current = setTimeout(() => {
            setExit(true);
            setTimeout(() => notificationCtx.deleteMessage(props.id), 500);
        }, 3000);
    }, []);

    function removeNotification() {
        clearTimeout(timeout.current);
        setExit(true);
        setTimeout(() => notificationCtx.deleteMessage(props.id), 500);
    }

    return (
        <div className={`${classes.container} ${exit ? classes.exit : ""}`}>
            <button onClick={removeNotification}>x</button>
            <p>{props.message}</p>
        </div>
    );
}