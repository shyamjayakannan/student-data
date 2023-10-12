"use client";

import Topbar from "../components/Topbar/Topbar";
import Notifications from "../components/notification/notifications";
import { AuthenticationContextProvider } from "../store/AuthenticationContext";
import { NotificationContextProvider } from "../store/NotificationContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function Wrapper({ children }) {
    const path = usePathname();

    return (
        <NotificationContextProvider>
            <AuthenticationContextProvider>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                    {(!path.includes("/auth") && !path.includes("/resetpassword")) && <Topbar />}
                    <Notifications />
                    <main>{children}</main>
                    <Script />
                </GoogleOAuthProvider>
            </AuthenticationContextProvider>
        </NotificationContextProvider>
    );
}