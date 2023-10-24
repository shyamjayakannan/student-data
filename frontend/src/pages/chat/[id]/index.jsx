"use client";

import { useParams } from 'next/navigation';
import Layout from '../../../components/chat/Layout'
import useChat from '../../../hooks/useChat';
import { useEffect, useState } from 'react';
import InputBox from '../../../components/chat/InputBox';
import classes from "../../../styles/chat/Default.module.css";
import ChatContainer from '../../../components/chat/ChatContainer';

function ChatId() {
    const params = useParams();
    const { chat, setMessage } = useChat();
    const [messages, setMessages] = useState(chat.message === "" ? [] : [{ sender: "user", message: chat.message }]);
    
    useEffect(() => {
        if (chat.message !== "") {
            setMessage("");
        }
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes["semi-chat"]}>
                {messages.map((message, index) => <ChatContainer key={index} chat={message} />)}
            </div>
            <InputBox />
        </div>
    );
}

ChatId.getLayout = (page) => <Layout>{page}</Layout>;

export default ChatId;