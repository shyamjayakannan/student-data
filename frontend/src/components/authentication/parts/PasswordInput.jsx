"use client";

import { useEffect, useState } from "react";
import useValidator from "../../../hooks/useValidator";
import styles from "../../../styles/authentication/parts/PasswordInput.module.css";
import Image from "next/image";

function PasswordInput(props) {
    const [visible, setVisible] = useState(false);
    const [password, setpassword, checkpassword, passwordIsValid, passwordIsFocussed, setpasswordIsFocussed] = useValidator('', 'PASSWORD');

    // return most recent value of IsValid when the re render is cause due to a change in only its value, not others
    const { onCheck } = props;
    useEffect(() => onCheck(passwordIsValid, password, 'password'), [passwordIsValid, onCheck]);

    useEffect(checkpassword, [password, checkpassword]);

    return (
        <div className={styles.card}>
            <div>
                <label htmlFor="password">Password(minimum of 7 characters)</label>
                <input autoComplete={props.autoComplete} className={`${passwordIsFocussed || passwordIsValid ? styles.cardinput : styles.incorrect}`} onChange={e => setpassword(e.target.value)} onFocus={() => setpasswordIsFocussed(true)} onBlur={() => setpasswordIsFocussed(false)} type={visible ? "text" : "password"} id="password" />
                {!visible ? <Image onClick={() => setVisible(true)} className={styles.eye} height={20} width={20} src="/images/view.png" alt="" /> : <Image height={20} width={20} onClick={() => setVisible(false)} className={styles.eye} src="/images/hide.png" alt="" />}
                <div className={styles.line}></div>
                {(!passwordIsValid && !passwordIsFocussed) && <p>&#9888; Please Enter a valid Password</p>}
            </div>
        </div>
    );
};

export default PasswordInput;