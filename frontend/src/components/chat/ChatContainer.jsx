import React, { useEffect, useRef } from 'react'
import classes from "../../styles/chat/ChatContainer.module.css";

export default function ChatContainer(props) {
    const displayRef = useRef();

    useEffect(() => {
        if (displayRef.current) {
            props.chat.message.replaceAll('<html>', '');
            props.chat.message.replaceAll('</html>', '');
            props.chat.message.replaceAll('<body>', '');
            props.chat.message.replaceAll('</body>', '');
            props.chat.message.replaceAll('<head>', '');
            props.chat.message.replaceAll('</head>', '');
            displayRef.current.innerHTML = `<div>${props.chat.message}</div>`;
        }
    }, [props.chat.message]);

    return (
        <div className={classes.main}>
            <div className={`${classes.container} ${props.chat.sender === "Bot" ? classes.grey : ""}`}>
                <div>{props.chat.sender}: </div>
                <div className={classes.display}>
                    {props.chat.message === "" ?
                        <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", height: "100%" }}>
                            <span className={classes.loading}></span>
                            <span className={classes.loading}></span>
                            <span className={classes.loading}></span>
                        </div> : <div className={classes.result} ref={displayRef}></div>
                    }
                </div>
            </div>
        </div>
    );
}