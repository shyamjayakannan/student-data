"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function useRedirect() {
    const searchParams = useSearchParams();
    const router = useRouter();

    function redirectUser(pathname) {
        let current = new URLSearchParams(Array.from(searchParams.entries()));
        current = current.toString();

        if (current === "") router.push(pathname);
        else {
            const index = current.indexOf("selected=");
            const path = current.slice(index + 9).replaceAll("%2F", "/");
            router.push(`${path}`);
        }
    }
    return redirectUser;
}