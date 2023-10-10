"use client";

import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "../../../hooks/useAuth";
import { useContext } from "react";
import AuthenticationContext from "../../../store/AuthenticationContext";
import useRedirect from "../../../hooks/useRedirect";
import NotificationContext from "../../../store/NotificationContext";

export default function GoogleAuth(props) {
    const Auth = useAuth();
    const authenticationCtx = useContext(AuthenticationContext);
    const notificationCtx = useContext(NotificationContext);
    const redirectUser = useRedirect();
    const login = useGoogleLogin({
        async onSuccess(user) {
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    }
                }
            );
            const responseData = await response.json();
            const response1 = await Auth(
                { email: responseData.email, password: responseData.id },
                props.LogInOpen ? "signin" : "signup",
            );
            if (response1 === "Success") {
                // redirect
                redirectUser();
                authenticationCtx.setLoggedIn(true);
            } else {
                notificationCtx.message("Email is already in use and cannot be used to Sign In with Google");
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return <button onClick={login}>{props.LogInOpen ? "Sign In" : "Sign Up"} with Google</button>;
}