import Image from "next/image";
import classes from "../../styles/chat/Titles.module.css";
import Link from "next/link";

export default function Titles(props) {
    return (
        <Link href={`/chat/${props.id}`} className={classes.container} onClick={() => props.onSelect(props.index)}>
            <div className={classes.combine}>
                {props.title}
                <button disabled={!props.selected} className={classes.delbtn} onClick={() => props.onDelete(props.index)}>
                    <Image src="/images/delete-48.png" height={25} width={25} alt="delete" />
                </button>
            </div>
        </Link>
    );
}   