"use client";

import React, { useState, useContext, useReducer, useCallback } from "react";
import AuthenticationContext from "../../store/AuthenticationContext";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/authentication/LogIn.module.css";
import Card from "../../ui/Card";
import Loader from "../../ui/loader";
import EmailInput from "./parts/EmailInput";
import PasswordInput from "./parts/PasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function valueReducer(state, action) {
    switch (action.type) {
        case "password": return { ...state, password: { value: action.value, valid: action.valid } };
        case "email": return { ...state, email: { value: action.value, valid: action.valid } };
        default: return state;
    }
}

export default function LogIn() {
    const searchParams = useSearchParams();
    const router = useRouter();
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
            AuthenticationCtx.setDetails();
            
            // redirect
            let current = new URLSearchParams(Array.from(searchParams.entries()));
            current = current.toString();
            
            if (current === "") router.push("/");
            else {
                const index = current.indexOf("=");
                const path = current.slice(index + 4);
                router.push(`/${path}`);
            }
            AuthenticationCtx.setLoggedIn(true);
        }

        setLoader(false);
    }

    return (
        <Card style={{ width: "400px" }} noshadow> 
            <EmailInput onCheck={check} />
            <PasswordInput onCheck={check} />
            <div className={styles.register}>
                <Link href="/resetpassword" className={styles.forgot}>Forgot Password?</Link>
            </div>
            {loader ? <Loader />
                : success ? <div className={styles.success} /> :
                    <button onClick={submit} className={styles["navigate-link"]} disabled={!(value.password.valid && value.email.valid)}>Sign In</button>
            }
        </Card>
    );
}