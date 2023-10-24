import classes from "../../styles/chat/InputBox.module.css";

export default function InputBox(props) {
    function submit(e) {
        if (e.key !== "Enter") return;
        props.sendData(e.target.innerText);
    }

    return (
        <div className={classes.container}>
            <span onKeyDown={submit} className={classes.input} role="textbox" contentEditable />
        </div>
    );
}