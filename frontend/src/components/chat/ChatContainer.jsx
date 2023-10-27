import React from 'react'
import classes from "../../styles/chat/ChatContainer.module.css";

export default function ChatContainer(props) {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div>{props.chat.sender}: </div>
                <p>{props.chat.message}</p>
            </div>
        </div>
    );
}