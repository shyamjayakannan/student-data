import React from 'react'
import classes from "../../styles/chat/ChatContainer.module.css";

export default function ChatContainer(props) {
    return (
        <div className={classes.main}>
            <div className={`${classes.container} ${props.chat.sender === "Bot" ? classes.grey : ""}`}>
                <div>{props.chat.sender}: </div>
                <div>
                    {props.chat.message === "" ?
                        <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", height: "100%" }}>
                            <span className={classes.loading}></span>
                            <span className={classes.loading}></span>
                            <span className={classes.loading}></span>
                        </div> : props.chat.message
                    }
                </div>
            </div>
        </div>
    );
}