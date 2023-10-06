"use client";

import styles from "../styles/ui/Card.module.css";

function Card(props) {
    return <div style={props.style} className={`${props.className ? props.className : ''} ${props.noshadow ? styles['without-shadow'] : styles.container}`}>{props.children}</div>;
};

export default Card;