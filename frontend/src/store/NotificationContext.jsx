"use client";
import React, { useState, createContext } from "react";
import { v4 } from "uuid";

const NotificationContext = createContext({
    messages: [],
    message: (message) => { },
    deleteMessage: (id) => { },
});

export function NotificationContextProvider({ children }) {
    const [messages, setMessages] = useState([]);

    function messageHandler(message) {
        setMessages(messages => [...messages, { message, id: v4() }]);
    }

    function deleteMessageHandler(id) {
        setMessages(messages => messages.filter(message => message.id !== id));
    }

    return (
        <NotificationContext.Provider
            value={{
                messages,
                message: messageHandler,
                deleteMessage: deleteMessageHandler,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;