import Image from "next/image";
import classes from "../../styles/chat/Titles.module.css";
import Link from "next/link";
import usePopup from "../../ui/Popup";

export default function Titles(props) {
    const { popup, setPopup, Component } = usePopup();

    return (
        <Link href={`/chat/${props.id}`} className={`${classes.container} ${props.selected ? classes.selected : ""}`} onClick={() => props.onSelect(props.index)}>
            <div className={classes.combine}>
                <span>{props.title}</span>
                <div className={`${!props.selected ? classes.yes : ""} ${classes.yoo}`}>
                    <button disabled={!props.selected} className={classes.delbtn} onClick={() => setPopup(true)}>
                        <Image src="/images/delete-48.png" height={25} width={25} alt="delete" />
                    </button>
                </div>
            </div>
            {popup && <Component function={() => props.onDelete(props.index)} title="Delete" message="Do you wish to delete this conversation?" action="Delete" />}
        </Link>
    );
}   