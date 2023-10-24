"use client";

import { useEffect, useState } from "react";

const chat = {
    message: "",
    title: "",
};
const setters = [];

export default function useChat() {
    const setChat = useState(chat)[1];
    setters.push(setChat);

    useEffect(() => () => setters.filter(setter => setter !== setChat), []);

    function setMessage(message) {
        chat.message = message;
        setters.forEach(setter => setter({...chat}));
    }

    function setTitle(title) {
        chat.title = title;
        setters.forEach(setter => setter({...chat}));
    }

    return { chat, setMessage, setTitle };
}