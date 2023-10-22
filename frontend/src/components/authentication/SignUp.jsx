"use client";

import React, { useState, useContext, useReducer, useCallback } from "react";
import AuthenticationContext from "../../store/AuthenticationContext";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/authentication/LogIn.module.css";
import Card from "../../ui/Card";
import Loader from "../../ui/loader";
import EmailInput from "./parts/EmailInput";
import PasswordInput from "./parts/PasswordInput";
import useRedirect from "../../hooks/useRedirect";

function valueReducer(state, action) {
    switch (action.type) {
        case "password": return { ...state, password: { value: action.value, valid: action.valid } };
        case "email": return { ...state, email: { value: action.value, valid: action.valid } };
        default: return state;
    }
}

export default function SignUp(props) {
    const redirectUser = useRedirect();
    const [value, dispatchValue] = useReducer(valueReducer, { password: { value: "", valid: false }, email: { value: "", valid: false } });
    const check = useCallback((isValid, value, id) => dispatchValue({ type: id, value, valid: isValid }), []);
    const [loader, setLoader] = useState(false),
        [success, setSuccess] = useState();
    const Auth = useAuth();
    const authenticationCtx = useContext(AuthenticationContext);

    async function submit(e) {
        e.preventDefault();
        setLoader(true);
        const response = await Auth(
            { email: value.email.value, password: value.password.value },
            "signup"
        );
        if (response === "Success") {
            setSuccess(true);

            // redirect
            redirectUser('/dashboard');
            authenticationCtx.setLoggedIn(true);
            props.toggle();
        }

        setLoader(false);
    };

    return (
        <>
            <h1>Sign Up</h1>
            <Card style={{ width: "400px" }} noshadow>
                <EmailInput autoComplete="email" onCheck={check} />
                <PasswordInput autoComplete="new-password" onCheck={check} />
                {loader ? <Loader />
                    : success ? <div className={styles.success} /> :
                        <button onClick={submit} className={styles["navigate-link"]} disabled={!(value.password.valid && value.email.valid)}>Sign Up</button>
                }
            </Card>
        </>
    );
}
