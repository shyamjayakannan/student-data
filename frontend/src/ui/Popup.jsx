"use client";

import { useState } from "react";
import classes from "../styles/ui/Popup.module.css";

export default function usePopup() {
    const [popup, setPopup] = useState(false);

    return {
        Component(props) {
            return (
                <div className={classes.backdrop} data-type="backdrop" onClick={e => e.target.getAttribute("data-type") === "backdrop" ? setPopup(false) : {}}>
                    <div className={classes.container}>
                        <h1>{props.title}</h1>
                        <p>{props.message}</p>
                        <div className={classes.buttons}>
                            <button onClick={() => setPopup(false)}>Cancel</button>
                            <button onClick={props.function}>{props.action}</button>
                        </div>
                    </div>
                </div>
            );
        },
        setPopup,
        popup,
    };
}