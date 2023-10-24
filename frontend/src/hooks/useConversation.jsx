"use client";

import { useContext } from "react";
import NotificationContext from "../store/NotificationContext";

export default function useConversation() {
    const notificationCtx = useContext(NotificationContext);

    async function Conversation(data, type) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/${type}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const responsedata = await response.json();

            if (responsedata.type === "Error") notificationCtx.message(responsedata.message);
            return responsedata;
        } catch (err) {
            console.log(err);
            notificationCtx.message("Check your connection!");
        }
    }

    return Conversation;
}