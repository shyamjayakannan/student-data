"use client";

import { useRouter } from "next/router";
import Default from "../../components/chat/Default";
import Layout from "../../components/chat/Layout";

export default function Chat() {
    const router = useRouter();
    router.push("/chat/new");
    return (<></>);
}