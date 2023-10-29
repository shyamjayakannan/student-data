"use client";

import { useContext } from "react";
import NotificationContext from "../store/NotificationContext";

export default function useSkillSet() {
    const notificationCtx = useContext(NotificationContext);

    async function SkillSet(data, type) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/skills/${type}`,
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
            return responsedata;
        } catch (err) {
            console.log(err);
            notificationCtx.message("Check your connection!");
        }
    }

    return SkillSet;
}