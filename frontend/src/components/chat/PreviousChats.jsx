"use client";

import { useContext, useEffect, useState } from "react";
import classes from "../../styles/chat/PreviousChat.module.css";
import AuthenticationContext from "../../store/AuthenticationContext";
import useConversation from "../../hooks/useConversation";
import Titles from "./Titles";
import { useRouter } from "next/router";

export default function PreviousChat(props) {
    const authenticationCtx = useContext(AuthenticationContext);
    const Conversation = useConversation();
    const [titles, setTitles] = useState([]);
    const [selected, setSelected] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (authenticationCtx.details.id === "") return;
        (async () => {
            try {
                const response = await Conversation({ userId: authenticationCtx.details.id }, "getAllUserConversations");
                if (response.type === "Success") {
                    setTitles(titles => {
                        titles = [];
                        response.conversations.forEach(conversation => {
                            titles.push({ title: conversation.title, when: conversation.timestamp, id: conversation.id });
                        });
                        return [...titles];
                    });
                }
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, [authenticationCtx.details.id, props.call]);

    useEffect(() => {
        setSelected(selected => {
            const newSelected = new Array(titles.length).fill(false);

            if (selected.length < titles.length && router.query.id !== "new") newSelected[0] = true;
            return newSelected;
        });
    }, [titles]);

    useEffect(() => {
        if (router.query.id === "new") setSelected(selected => selected.map(_ => false));
    }, [router.query.id]);

    async function onDelete(index) {
        try {
            const backendResponse = await Conversation({
                id: titles[index].id,
                userId: authenticationCtx.details.id,
            }, "deleteConversation");

            if (backendResponse.type === "Error") return;
        } catch (err) {
            console.log(err.message);
        }

        setTitles(titles => {
            titles.splice(index, 1);
            return [...titles];
        });
        props.clear();
        router.push("/chat/new");
    }

    function onSelect(index) {
        setSelected(selected => {
            selected.fill(false);
            selected[index] = true;
            return [...selected];
        });
    }

    return (
        <div className={classes.container}>
            {titles.map((title, index) => <Titles key={index} onSelect={onSelect} selected={selected[index]} onDelete={onDelete} index={index} title={title.title} id={title.id} />)}
            <button className={classes.new} onClick={() => {
                props.clear();
                router.push("/chat/new");
            }}>New Chat</button>
        </div>
    );
}