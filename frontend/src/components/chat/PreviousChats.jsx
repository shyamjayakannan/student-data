"use client";

import { useContext, useEffect, useState } from "react";
import useChat from "../../hooks/useChat";
import classes from "../../styles/chat/PreviousChat.module.css";
import AuthenticationContext from "../../store/AuthenticationContext";
import useConversation from "../../hooks/useConversation";
import Titles from "./Titles";

let data = [];

export default function PreviousChat() {
    const { chat, setTitle } = useChat();
    const authenticationCtx = useContext(AuthenticationContext);
    const Conversation = useConversation();
    const [titles, setTitles] = useState([]);

    // needs to run once in the beginning regardless of chat.title. thats why separate
    useEffect(() => {
        // if (data.length !== 0) {
        //     setTitles(data);
        //     return;
        // }
        if (authenticationCtx.details.id === "") return;
        getTitles();
    }, [authenticationCtx.details]);
    
    useEffect(() => {
        if (chat.title === "") return;
        getTitles();
        setTitle("");
    }, [chat.title]);

    async function getTitles() {
        try {
            const response = await Conversation({ userId: authenticationCtx.details.id }, "getAllUserConversations");
            if (response.type === "Success") {
                setTitles(titles => {
                    titles = [];
                    data = [];
                    response.conversations.forEach(conversation => {
                        titles.push({ title: conversation.title, when: conversation.timestamp, id: conversation.id });
                        data.push({ title: conversation.title, when: conversation.timestamp, id: conversation.id });
                    });
                    return [...titles];
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className={classes.container}>
            {titles.map((title, index) => <Titles key={index} title={title.title} id={title.id} />)}
        </div>
    );
}