"use client";

import "../styles/global.css";
import Topbar from "../components/Topbar/Topbar";
import Notifications from "../components/notification/notifications";
import { AuthenticationContextProvider } from "../store/AuthenticationContext";
import { NotificationContextProvider } from "../store/NotificationContext";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "../store/ThemeContext";


export default function MyApp({ Component, pageProps }) {
  const path = usePathname();
  
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthenticationContextProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {!path.includes("/auth") && !path.includes("/resetpassword") && (
              <Topbar />
            )}
            <Notifications />
            <main>
                <Component {...pageProps} />
            </main>
          </GoogleOAuthProvider>
        </AuthenticationContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
}
