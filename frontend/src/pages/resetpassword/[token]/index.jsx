"use client";

import React, { useState, useReducer, useCallback, useEffect, useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import styles from "../../../styles/authentication/LogIn.module.css";
import Card from "../../../ui/Card";
import Loader from "../../../ui/loader";
import PasswordInput from "../../../components/authentication/parts/PasswordInput";
import { useParams, useRouter } from "next/navigation";
import NotificationContext from "../../../store/NotificationContext";

function valueReducer(state, action) {
    switch (action.type) {
        case "password": return { ...state, password: { value: action.value, valid: action.valid } };
        default: return state;
    }
}

export default function newPassword() {
    const [value, dispatchValue] = useReducer(valueReducer, { password: { value: "", valid: false } });
    const check = useCallback((isValid, value, id) => dispatchValue({ type: id, value, valid: isValid }), []);
    const [loader, setLoader] = useState(false);
    const Auth = useAuth();
    const router = useParams();
    const navigate = useRouter();
    const { token } = router;
    const notificationCtx = useContext(NotificationContext);
    const [backendUserData, setbackendUserData] = useState({
        email: "",
        userId: "",
        passwordToken: "",
    });

    useEffect(() => {
        async function callFunction() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getnewpassword/${token}`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
                const responsedata = await response.json();
                notificationCtx.message(responsedata.message);
                if (responsedata.type == "Success") {
                    setbackendUserData({
                        userId: responsedata.userId,
                        email: responsedata.email,
                        passwordToken: responsedata.passwordToken,
                    });
                } else navigate.push("/auth");
            } catch (err) {
                console.log(err.message);
            }
        }

        if (token) callFunction();
    }, [token]);

    async function submit(e) {
        e.preventDefault();
        setLoader(true);
        await Auth(
            {
                passwordToken: backendUserData.passwordToken,
                userId: backendUserData.userId,
                password: value.password.value,
            },
            "newPassword"
        );
        setLoader(false);

        // navigate
        navigate.push("/auth");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
            <Card style={{ width: "400px" }} noshadow>
                <PasswordInput autoComplete="new-password" onCheck={check} />
                {loader ? <Loader /> : <button onClick={submit} className={styles["navigate-link"]} disabled={!value.password.valid}>Reset Password</button>}
            </Card>
        </div>
    );
}