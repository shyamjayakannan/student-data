"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashBoard() {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard/dpage");
    }, []);

    return (<></>);
}