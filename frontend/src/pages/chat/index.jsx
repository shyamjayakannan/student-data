"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Chat() {
    const router = useRouter();

    useEffect(() => {
        router.push("/chat/new");
    }, []);

    return (<></>);
}