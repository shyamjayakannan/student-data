"use client";

import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../store/AuthenticationContext";
import LogIn from "../../components/authentication/LogIn";
import styles from "../../styles/authentication/Auth.module.css";
import SignUp from "../../components/authentication/signUp";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "../../ui/loadingSpinner";

export default function Auth() {
    const authenticationCtx = useContext(AuthenticationContext);
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authenticationCtx.isLoggedIn && pathname === "/auth") {
            setLoading(true);
            router.push("/");
        }
        else setLoading(false);
    }, []);

    function toggle() {
        if (authenticationCtx.open.LogInOpen) {
            authenticationCtx.hide("LogInOpen");
            authenticationCtx.show("signupOpen");
        } else if (authenticationCtx.open.signupOpen) {
            authenticationCtx.hide("signupOpen");
            authenticationCtx.show("LogInOpen");
        }
    }

    return (
        <>
            {loading ? <LoadingSpinner /> :
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
                {authenticationCtx.open.LogInOpen && <>
                    <LogIn />
                    <p className={styles.register}>New Here?<button onClick={toggle}>Register</button></p>
                </>}
                {authenticationCtx.open.signupOpen && <>
                    <SignUp />
                    <p className={styles.register}>Already Registered?<button onClick={toggle}>Sign In</button></p>
                </>}
            </div>}
        </>
    );
}