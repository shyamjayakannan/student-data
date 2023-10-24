"use client";

import { useRouter } from 'next/router';
import Layout from '../../../components/chat/Layout'
import { useContext, useEffect, useRef, useState } from 'react';
import InputBox from '../../../components/chat/InputBox';
import classes from "../../../styles/chat/Default.module.css";
import ChatContainer from '../../../components/chat/ChatContainer';
import AuthenticationContext from '../../../store/AuthenticationContext';
import useConversation from '../../../hooks/useConversation';
import { v4 } from "uuid";

function ChatId() {
    const containerRef = useRef();
    const router = useRouter();
    const authenticationCtx = useContext(AuthenticationContext);
    const Conversation = useConversation();
    const [messages, setMessages] = useState([]);
    const [messageHistory, setMessageHistory] = useState("");

    useEffect(() => {
        if (authenticationCtx.details.id === "" || router.query.id === "new") return;

        (async () => {
            try {
                if (chat.message !== "") {
                    setMessage("");

                    const pythonResponse = await pythonRequest();
                    const newMessages = [...messages, { sender: "bot", message: pythonResponse.message }];
                    setMessages(newMessages);
                    setMessageHistory(pythonResponse.messageHistory);
                    setTitle(pythonResponse.title);

                    await Conversation({
                        id: router.query.id,
                        userId: authenticationCtx.details.id,
                        title: pythonResponse.title,
                        messageHistory: pythonResponse.messageHistory,
                        messages: newMessages,
                    }, "createConversation");
                } else {
                    const backendResponse = await Conversation({
                        id: router.query.id,
                        userId: authenticationCtx.details.id,
                    }, "getConversation");

                    if (backendResponse.type === "Error") {
                        router.push("/chat");
                        return;
                    }
                    console.log(backendResponse.conversation.messages)
                    setMessages(backendResponse.conversation.messages);
                    setMessageHistory(backendResponse.conversation.messageHistory);
                }
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, [authenticationCtx.details, router.query.id]);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;

        const length = messages.length;

        if (length === 0 || messages[length - 1].sender === "user") return;
        (async () => {
            try {
                await Conversation({
                    id: router.query.id,
                    userId: authenticationCtx.details.id,
                    messageHistory,
                    messages,
                }, "updateConversation");
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, [messages]);

    async function pythonRequest() {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { message: "Hi, how are you?", messageHistory: "", title: "wow" };
        } catch (error) {
            console.log(error);
        }
    }

    async function sendData(message) {
        if (router.query.id === "new") {
            const id = v4();
            setMessage(message);
            router.push(`/chat/${id}`);
            return;
        }
        
        setMessages(messages => [...messages, { sender: "user", message }]);

        const pythonResponse = await pythonRequest();
        setMessages(messages => [...messages, { sender: "bot", message: pythonResponse.message }]);
        setMessageHistory(pythonResponse.messageHistory);
    }

    return (
        <LoadingWait>
            <div style={{ display: "flex", height: "calc(100vh - 68px)", position: "relative" }}>
                <PreviousChat />
                <main style={{ width: "100%", height: "100%" }}>
                    <div className={classes.container}>
                        {router.query.id === "new" ?
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

ChatId.getLayout = (page) => <Layout>{page}</Layout>;

export default ChatId;