import classes from "../../styles/chat/Titles.module.css";
import Link from "next/link";

export default function Titles(props) {
    return (
        <Link href={`/chat/${props.id}`} className={classes.container} onClick={() => props.onSelect(props.index)}>
            {props.title}
            <button disabled={!props.selected} onClick={() => props.onDelete(props.index)}>delete</button>
        </Link>
    );
}