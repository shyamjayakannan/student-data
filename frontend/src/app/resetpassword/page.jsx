"use client";

import React, { useState, useReducer, useCallback, useRef, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/authentication/LogIn.module.css";
import Card from "../../ui/Card";
import Loader from "../../ui/loader";
import EmailInput from "../../components/authentication/parts/EmailInput";
import useLocalStorage from "../../hooks/useLocalStorage";

function valueReducer(state, action) {
    switch (action.type) {
        case "email": return { ...state, email: { value: action.value, valid: action.valid } };
        default: return state;
    }
}

export default function resetPassword() {
    const [value, dispatchValue] = useReducer(valueReducer, { email: { value: "", valid: false } });
    const check = useCallback((isValid, value, id) => dispatchValue({ type: id, value, valid: isValid }), []);
    const [loader, setLoader] = useState(false);
    const [counter, setCounter] = useState(0);
    const interval = useRef();
    const Auth = useAuth();
    const { fetchPersonalDetails } = useLocalStorage();

    useEffect(() => {
        if (counter === 0) clearInterval(interval.current);
    }, [counter]);

    useEffect(() => {
        const data = fetchPersonalDetails();

        (async (data) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getResetPasswordEmailSentTime`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                const responsedata = await response.json();

                if (responsedata.type === "Success") {
                    const time = Math.round((Date.now() - responsedata.resetPasswordEmailSent) / 1000);

                    if (time < 10) {
                        setCounter(time);
                        interval.current = setInterval(() => setCounter(counter => counter - 1), 1000);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        })(data);
    }, []);

    async function submit(e) {
        e.preventDefault();
        setLoader(true);
        await Auth({ email: value.email.value }, "resetpassword");

        const data = fetchPersonalDetails();

        (async (data) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/setResetPasswordEmailSentTime`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                await response.json();
            } catch (err) {
                console.log(err);
            }
        })(data);

        setLoader(false);
        setCounter(10);
        interval.current = setInterval(() => setCounter(counter => counter - 1), 1000);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
            <Card style={{ width: "400px" }} noshadow>
                <EmailInput onCheck={check} />
                {loader ? <Loader /> : <button onClick={submit} className={styles["navigate-link"]} disabled={!value.email.valid || counter > 0}>{counter > 0 ? `Resend Email in ${counter}s` : "Send Password Reset Email"}</button>}
            </Card>
        </div>
    );
}