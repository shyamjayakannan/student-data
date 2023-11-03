import classes from "../../styles/chat/InputBox.module.css";

export default function InputBox(props) {
    function submit(e) {
        if (e.target.innerText.trim() === "" && e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // to prevent it from going to next line
            return;
        }
        if ((e.key === "Enter" && e.shiftKey) || e.key !== "Enter") return;
        e.preventDefault(); // to prevent it from going to next line
        props.sendData(e.target.innerText);
        e.target.innerText = "";
    }

    return (
        <div className={`${classes.container} ${props.className}`}>
            <span placeholder="Type or paste your message here" onKeyDown={submit} className={classes.input} role="textbox" contentEditable />
        </div>
    );
}