"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useRouterPush() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function routerPushChange(event) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        const value = event.trim();
        if (!value) current.delete("selected");
        else current.set("selected", pathname);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${event}${query}`);
    };

    return routerPushChange;
};
