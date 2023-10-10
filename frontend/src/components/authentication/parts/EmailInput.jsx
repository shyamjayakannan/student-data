"use client";

import { useEffect } from "react";
import useValidator from "../../../hooks/useValidator";
import styles from "../../../styles/authentication/parts/EmailInput.module.css";

function EmailInput(props) {
    const [email, setEmail, checkEmail, emailIsValid, emailIsFocussed, setEmailIsFocussed] = useValidator('', 'EMAIL');

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck } = props;
    useEffect(() => onCheck(emailIsValid, email, 'email'), [emailIsValid, onCheck]);

    useEffect(checkEmail, [email, checkEmail]);

    return (
        <div className={styles.card}>
            <div>
                <label htmlFor="email">Email</label>
                <input autoComplete={props.autoComplete} className={`${emailIsFocussed || emailIsValid ? styles.cardinput : styles.incorrect}`} onChange={e => setEmail(e.target.value)} onFocus={() => setEmailIsFocussed(true)} onBlur={() => setEmailIsFocussed(false)} type="email" id="email" />
                <div className={styles.line}></div>
                {(!emailIsValid && !emailIsFocussed) && <p>&#9888; Please Enter a valid Email</p>}
            </div>
        </div>
    );
};

export default EmailInput;