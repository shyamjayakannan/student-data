"use client";

import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import InputBox from '../../../components/chat/InputBox';
import classes from "../../../styles/chat/Default.module.css";
import ChatContainer from '../../../components/chat/ChatContainer';
import AuthenticationContext from '../../../store/AuthenticationContext';
import useConversation from '../../../hooks/useConversation';
import LoadingWait from '../../../ui/loadingWait';
import PreviousChat from '../../../components/chat/PreviousChats';

const data = {};

export default function ChatId() {
    const containerRef = useRef();
    const router = useRouter();
    const authenticationCtx = useContext(AuthenticationContext);
    const Conversation = useConversation();
    const [messages, setMessages] = useState([]);
    const [messageHistory, setMessageHistory] = useState("");
    const [call, setCall] = useState(true);

    useEffect(() => {
        if (authenticationCtx.details.id === "" || router.query.id === "new") return;
        if (data[router.query.id]) {
            setMessageHistory(data[router.query.id].messageHistory);
            setMessages(data[router.query.id].messages);
            return;
        }

        (async () => {
            try {
                const backendResponse = await Conversation({
                    id: router.query.id,
                    userId: authenticationCtx.details.id,
                }, "getConversation");

                if (backendResponse.type === "Error") {
                    router.push("/chat/new");
                    return;
                }

                data[router.query.id] = { messages: backendResponse.conversation.messages, messageHistory: backendResponse.conversation.messageHistory };
                setMessageHistory(backendResponse.conversation.messageHistory);
                setMessages(backendResponse.conversation.messages);
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, [authenticationCtx.details.id, router.query.id]);

    useEffect(() => {
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]);

    async function pythonRequest(message) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/chatbot`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message, messageHistory }),
                }
            );
            const pythonResponse = await response.json();
            // const pythonResponse = await new Promise(resolve => setTimeout(() => resolve({ message: "Hi, how are you?", messageHistory: "", title: "wow the weather is wonderful today isn't it wow the weather is wonderful today isn't it" }), 1000));
            const newMessages = [...messages, { sender: "User", message }, { sender: "Bot", message: pythonResponse.message }];

            data[router.query.id] = { messages: newMessages, messageHistory: pythonResponse.messageHistory };
            setMessageHistory(pythonResponse.messageHistory);
            setMessages(newMessages);
            return { newMessages, messageHistory: pythonResponse.messageHistory, title: pythonResponse.title };
        } catch (error) {
            console.log(error);
        }
    }

    async function sendData(message) {
        try {
            if (router.query.id === "new") {
                setMessages([{ sender: "User", message }, { sender: "Bot", message: "" }]);

                const pythonResponse = await pythonRequest(message);

                const backendResponse = await Conversation({
                    userId: authenticationCtx.details.id,
                    title: pythonResponse.title,
                    messageHistory: pythonResponse.messageHistory,
                    messages: pythonResponse.newMessages,
                }, "createConversation");

                if (backendResponse.type === "Success") {
                    setCall(call => !call);
                    router.push(`/chat/${backendResponse.conversation.id}`);
                }
                return;
            }

            setMessages(messages => [...messages, { sender: "User", message }, { sender: "Bot", message: "" }]);

            const pythonResponse = await pythonRequest(message);

            await Conversation({
                id: router.query.id,
                userId: authenticationCtx.details.id,
                messageHistory: pythonResponse.messageHistory,
                messages: pythonResponse.newMessages,
            }, "updateConversation");
        } catch (err) {
            console.log(err.message);
        }
    }

    function clearMessages() {
        setMessages([]);
        setMessageHistory("");
    }

    return (
        <LoadingWait>
            <div style={{ display: "flex", height: "calc(100vh - 68px)", position: "relative" }}>
                <PreviousChat clear={clearMessages} call={call} />
                <main style={{ width: "100%", height: "100%" }}>
                    <div className={classes.container}>
                        {router.query.id === "new" && messages.length === 0 ?
                            <div className={classes.semi}>
                                <h1>Select one of your chats from the left or type below to begin a new one</h1>
                            </div> :
                            <div ref={containerRef} className={classes["semi-chat"]}>
                                {messages.map((message, index) => <ChatContainer key={index} chat={message} />)}
                            </div>
                        }
                        <InputBox sendData={sendData} />
                    </div>
                </main>
            </div>
        </LoadingWait>
    );
}