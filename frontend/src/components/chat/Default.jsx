"use client";

import { useRouter } from "next/navigation";
import useChat from "../../hooks/useChat";
import classes from "../../styles/chat/Default.module.css";
import InputBox from "./InputBox";
import { v4 } from "uuid";

export default function Default() {
    const { setMessage } = useChat();
    const router = useRouter();

    function sendData(message) {
        const id = v4();
        setMessage(message);
        router.push(`/chat/${id}`);
    }

    return (
        <div className={classes.container}>
            <div className={classes.semi}>
                <h1>Select one of your chats from the left or type below to begin a new one</h1>
            </div>
            <InputBox sendData={sendData} />
        </div>
    );
}