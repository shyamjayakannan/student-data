"use client";

import React, { useState, useContext, useReducer, useCallback } from "react";
import AuthenticationContext from "../../store/AuthenticationContext";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/authentication/LogIn.module.css";
import Card from "../../ui/Card";
import Loader from "../../ui/loader";
import EmailInput from "./parts/EmailInput";
import PasswordInput from "./parts/PasswordInput";
import Link from "next/link";
import useRedirect from "../../hooks/useRedirect";

function valueReducer(state, action) {
    switch (action.type) {
        case "password": return { ...state, password: { value: action.value, valid: action.valid } };
        case "email": return { ...state, email: { value: action.value, valid: action.valid } };
        default: return state;
    }
}

export default function LogIn(props) {
    const redirectUser = useRedirect();
    const [value, dispatchValue] = useReducer(valueReducer, { password: { value: "", valid: false }, email: { value: "", valid: false } });
    const check = useCallback((isValid, value, id) => dispatchValue({ type: id, value, valid: isValid }), []);
    const [loader, setLoader] = useState(false),
        [success, setSuccess] = useState();
    const Auth = useAuth();
    const AuthenticationCtx = useContext(AuthenticationContext);

    async function submit(e) {
        e.preventDefault();
        setLoader(true);
        const response = await Auth(
            { email: value.email.value, password: value.password.value },
            "signin"
        );
        if (response === "Success") {
            setSuccess(true);

            // redirect
            redirectUser('/dashboard');
            AuthenticationCtx.setLoggedIn(true);
        } else if (response === "User Not found Error") props.toggle();

        setLoader(false);
    }

    return (
        <>
            <h1>Sign In</h1>
            <Card style={{ width: "400px" }} noshadow>
                <EmailInput autoComplete="email" onCheck={check} />
                <PasswordInput autoComplete="current-password" onCheck={check} />
                <div className={styles.register}>
                    <Link href="/resetpassword" className={styles.forgot}>Forgot Password?</Link>
                </div>
                {loader ? <Loader />
                    : success ? <div className={styles.success} /> :
                        <button onClick={submit} className={styles["navigate-link"]} disabled={!(value.password.valid && value.email.valid)}>Sign In</button>
                }
            </Card>
        </>
    );
}