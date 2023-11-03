"use client";

import "../styles/global.css";
import Topbar from "../components/Topbar/Topbar";
import Notifications from "../components/notification/notifications";
import { AuthenticationContextProvider } from "../store/AuthenticationContext";
import { NotificationContextProvider } from "../store/NotificationContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "../store/ThemeContext";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthenticationContextProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {!router.route.includes("/auth") && !router.route.includes("/resetpassword") && (
              <Topbar />
            )}
            <Notifications />
            <main className="main">
              <Component {...pageProps} />
            </main>
          </GoogleOAuthProvider>
        </AuthenticationContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
}
