import classes from "../../styles/chat/Titles.module.css";
import Link from "next/link";

export default function Titles(props) {
    return (
        <Link href={`/chat/${props.id}`} className={classes.container}>
            {props.title}
        </Link>
    );
}