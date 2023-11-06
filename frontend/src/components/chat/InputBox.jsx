"use client";

import { useEffect, useRef, useState } from "react";
import classes from "../../styles/chat/InputBox.module.css";

export default function InputBox(props) {
    const [ok, setOk] = useState(false);
    const spanRef = useRef();

    useEffect(() => {
        if (props.preset) spanRef.current.innerText = props.preset;
        
        function paste(e) {
            e.preventDefault();
            
            const text = (e.clipboardData || window.clipboardData).getData("text");
            spanRef.current.innerText += text ? text : "";

            // Move the cursor to the end of the pasted text
            const range = document.createRange();
            range.selectNodeContents(spanRef.current);
            range.collapse(false);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        window.addEventListener("paste", paste);
        return () => window.removeEventListener("paste", paste);
    }, []);

    function seto(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter" && e.shiftKey) return;
    }

    function submit1(e) {
        if (e.target.innerText.trim() === "" && e.key === "Enter" && !e.shiftKey) {
            setOk(false);
            return;
        }
        if (e.key === "Enter" && e.shiftKey) return;
        if (e.key !== "Enter") {
            e.target.innerText.trim() !== "" ? setOk(true) : setOk(false);
            return;
        }
        props.sendData(e.target.innerText);
        if (!props.noclear) e.target.innerText = "";
        setOk(false);
    }

    function submit2() {
        props.sendData(spanRef.current.innerText);
        if (!props.noclear) spanRef.current.innerText = "";
        setOk(false);
    }

    return (
        <div className={`${props.className} ${classes.container}`}>
            <div className={classes.containerSub}>
                <span ref={spanRef} placeholder="Type or paste your message here" onKeyUp={submit1} onKeyDown={seto} className={classes.input} role="textbox" contentEditable />
                <button className={classes.submit} disabled={!ok} onClick={submit2}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                        <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}