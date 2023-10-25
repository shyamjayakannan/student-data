"use client";

import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../store/AuthenticationContext";
import LoadingSpinner from "./loadingSpinner";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function LoadingWait(props) {
    const authenticationCtx = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (router.asPath.includes("[")) return;
        if (authenticationCtx.isLoggedIn) {
            setLoading(false);
        }
        else {
            setLoading(true);
            if (authenticationCtx.open.logoutButton) {
                router.push("/");
                authenticationCtx.setLogoutButton(false);
            } else {
                const event = "/auth";
                const current = new URLSearchParams(Array.from(searchParams.entries()));
                const value = event.trim();
                if (!value) current.delete("selected");
                else current.set("selected", router.asPath);
                const search = current.toString();
                const query = search ? `?${search}` : "";
                router.push(`${event}${query}`);
            }
        }
    }, [authenticationCtx.isLoggedIn, router.asPath]);

    return <>{loading ? <LoadingSpinner /> : props.children}</>;
}