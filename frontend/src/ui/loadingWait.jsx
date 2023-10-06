"use client";

import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../store/AuthenticationContext";
import LoadingSpinner from "./loadingSpinner";
import useRouterPush from "../hooks/useRouterPush";

export default function LoadingWait(props) {
    const authenticationCtx = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true);
    const routerPushChange = useRouterPush();

    useEffect(() => {
        if (authenticationCtx.isLoggedIn) {
            setLoading(false);
        }
        else {
            setLoading(true);
            routerPushChange("/auth");
        }
    }, [authenticationCtx.isLoggedIn]);

    return <>{loading ? <LoadingSpinner /> : props.children}</>;
}