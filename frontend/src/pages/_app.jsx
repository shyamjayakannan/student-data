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
  const getLayout = Component.getLayout || ((page) => page);
  
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
            <main style={{marginTop: "68px"}}>
                {getLayout(<Component {...pageProps} />)}
            </main>
          </GoogleOAuthProvider>
        </AuthenticationContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
}
